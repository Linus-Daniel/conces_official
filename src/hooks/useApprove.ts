// hooks/useApprovalSystem.ts
import { useState, useMemo } from "react";
import api from "@/lib/axiosInstance";
import { APPROVAL_CONFIGS, ApprovalEntity } from "@/lib/approvalConfig";
import {
  showApprovalSuccess,
  showApprovalError,
  showBatchResult,
  showError,
  showWarning,
} from "@/lib/toast";

interface ApprovalItem {
  _id: string;
  approved: boolean;
  [key: string]: any;
}

interface UseApprovalSystemProps<T> {
  items: T[];
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  entity: ApprovalEntity;
  userRole: string;
}

interface ApprovalFilters {
  searchTerm: string;
  approvalFilter: "all" | "approved" | "pending";
  [key: string]: any;
}

export const useApprovalSystem = <T extends ApprovalItem>({
  items,
  setItems,
  entity,
  userRole,
}: UseApprovalSystemProps<T>) => {
  // State
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<ApprovalFilters>({
    searchTerm: "",
    approvalFilter: "all",
  });

  const config = APPROVAL_CONFIGS[entity];
  const canApprove = userRole === "admin";

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesApproval =
        filters.approvalFilter === "all" ||
        (filters.approvalFilter === "approved" && item.approved) ||
        (filters.approvalFilter === "pending" && !item.approved);

      return matchesApproval;
    });
  }, [items, filters.approvalFilter]);

  // Individual approval change
  const handleApprovalChange = async (itemId: string, approved: boolean) => {
    if (!canApprove) {
      showError(`Only admins can approve ${config.entityNamePlural}`);
      return;
    }

    setIsUpdating(itemId);

    try {
      const response = await api.put(`${config.endpoint}/${itemId}`, {
        approved,
      });
      console.log(`${config.entityName} updated:`, response.data);

      // Update local state
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, approved } : item
        )
      );

      // Show success toast
      showApprovalSuccess(
        config.entityName,
        approved ? "approved" : "rejected"
      );
    } catch (error) {
      console.error(`Error updating ${config.entityName}:`, error);

      // Show error toast with specific message
      const errorMessage = error instanceof Error ? error.message : undefined;
      showApprovalError(config.entityName, errorMessage);
    } finally {
      setIsUpdating(null);
    }
  };

  // Batch approval change
  const handleBatchApproval = async (approved: boolean) => {
    if (!canApprove) {
      showError(`Only admins can approve ${config.entityNamePlural}`);
      return;
    }

    if (selectedItems.size === 0) {
      showWarning(`Please select ${config.entityNamePlural} to update`);
      return;
    }

    setIsBatchUpdating(true);

    try {
      const updatePromises = Array.from(selectedItems).map((itemId) =>
        api.put(`${config.endpoint}/${itemId}`, { approved })
      );

      const responses = await Promise.allSettled(updatePromises);
      const failed = responses.filter((r) => r.status === "rejected").length;
      const successful = selectedItems.size - failed;

      // Update local state for successful updates
      setItems((prevItems) =>
        prevItems.map((item) =>
          selectedItems.has(item._id) ? { ...item, approved } : item
        )
      );

      // Clear selection
      setSelectedItems(new Set());

      // Show appropriate batch result toast
      showBatchResult(
        config.entityName,
        selectedItems.size,
        failed,
        approved ? "approved" : "rejected"
      );
    } catch (error) {
      console.error("Error in batch update:", error);
      showApprovalError(
        config.entityNamePlural,
        `Failed to update ${config.entityNamePlural}`
      );
    } finally {
      setIsBatchUpdating(false);
    }
  };

  // Selection handlers
  const handleSelectItem = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(filteredItems.map((item) => item._id));
      setSelectedItems(allIds);
    } else {
      setSelectedItems(new Set());
    }
  };

  // Filter handlers
  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      approvalFilter: "all",
    });
    setSelectedItems(new Set());
  };

  return {
    // State
    filteredItems,
    selectedItems,
    isUpdating,
    isBatchUpdating,
    filters,
    canApprove,
    config,

    // Actions
    handleApprovalChange,
    handleBatchApproval,
    handleSelectItem,
    handleSelectAll,
    updateFilter,
    clearFilters,
  };
};
