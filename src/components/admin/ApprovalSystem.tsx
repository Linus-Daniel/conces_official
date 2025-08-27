// components/ApprovalSystem.tsx
import React from "react";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApprovalItem {
  _id: string;
  approved: boolean;
  [key: string]: any;
}

interface ApprovalSystemProps<T extends ApprovalItem> {
  // Hook return values
  filteredItems: T[];
  selectedItems: Set<string>;
  isUpdating: string | null;
  isBatchUpdating: boolean;
  filters: any;
  canApprove: boolean;
  config: any;

  // Hook functions
  handleApprovalChange: (itemId: string, approved: boolean) => void;
  handleBatchApproval: (approved: boolean) => void;
  handleSelectItem: (itemId: string, checked: boolean) => void;
  handleSelectAll: (checked: boolean) => void;
  updateFilter: (key: string, value: any) => void;
  clearFilters: () => void;

  // Custom props
  totalItems: number;
  additionalFilters?: React.ReactNode;
  searchPlaceholder?: string;
  searchFields?: string[]; // Fields to search in
  className?: string;
}

export const ApprovalSystem = <T extends ApprovalItem>({
  filteredItems,
  selectedItems,
  isUpdating,
  isBatchUpdating,
  filters,
  canApprove,
  config,
  handleApprovalChange,
  handleBatchApproval,
  handleSelectItem,
  handleSelectAll,
  updateFilter,
  clearFilters,
  totalItems,
  additionalFilters,
  searchPlaceholder,
  searchFields = ["title", "name"],
  className = "",
}: ApprovalSystemProps<T>) => {
  // Apply search filter to already filtered items
  const searchFilteredItems = React.useMemo(() => {
    if (!filters.searchTerm) return filteredItems;

    return filteredItems.filter((item) => {
      return searchFields.some((field) => {
        const fieldValue = item[field];
        return (
          fieldValue &&
          fieldValue
            .toString()
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase())
        );
      });
    });
  }, [filteredItems, filters.searchTerm, searchFields]);

  const ApprovalBadge = ({ approved }: { approved: boolean }) => {
    if (approved) {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 border border-green-300 flex items-center w-fit">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300 flex items-center w-fit">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </span>
      );
    }
  };

  const ApprovalActions = ({ item }: { item: T }) => {
    if (!canApprove) return null;

    return (
      <>
        {!item.approved ? (
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            onClick={() => handleApprovalChange(item._id, true)}
            disabled={isUpdating === item._id}
          >
            {isUpdating === item._id ? (
              <Clock className="w-3 h-3 animate-spin" />
            ) : (
              <CheckCircle className="w-3 h-3" />
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            onClick={() => handleApprovalChange(item._id, false)}
            disabled={isUpdating === item._id}
          >
            {isUpdating === item._id ? (
              <Clock className="w-3 h-3 animate-spin" />
            ) : (
              <XCircle className="w-3 h-3" />
            )}
          </Button>
        )}
      </>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={
                searchPlaceholder || `Search ${config.entityNamePlural}...`
              }
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Approval Filter */}
          <Select
            value={filters.approvalFilter}
            onValueChange={(value) => updateFilter("approvalFilter", value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by approval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          {/* Additional Filters */}
          {additionalFilters}

          {/* Clear Filters */}
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        {/* Batch Actions Bar */}
        {canApprove && selectedItems.size > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm text-blue-700">
              {selectedItems.size} {config.entityNamePlural} selected
            </span>
            <Button
              size="sm"
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              onClick={() => handleBatchApproval(true)}
              disabled={isBatchUpdating}
            >
              {isBatchUpdating ? (
                <Clock className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              Approve Selected
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              onClick={() => handleBatchApproval(false)}
              disabled={isBatchUpdating}
            >
              {isBatchUpdating ? (
                <Clock className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              Reject Selected
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="px-4 text-sm text-gray-600">
        Showing {searchFilteredItems.length} of {totalItems}{" "}
        {config.entityNamePlural}
      </div>

      {/* Table Helper Components - Export these for custom table usage */}
      {React.Children.toArray([
        // Select All Checkbox
        <Checkbox
          key="select-all"
          checked={
            selectedItems.size === searchFilteredItems.length &&
            searchFilteredItems.length > 0
          }
          onCheckedChange={handleSelectAll}
          style={{ display: "none" }} // Hide this, will be used in custom tables
        />,

        // Individual Checkbox (hidden, for reference)
        searchFilteredItems.map((item) => (
          <Checkbox
            key={`select-${item._id}`}
            checked={selectedItems.has(item._id)}
            onCheckedChange={(checked) =>
              handleSelectItem(item._id, checked as boolean)
            }
            style={{ display: "none" }}
          />
        )),
      ])}

      {/* Expose these components for table usage */}
      <div style={{ display: "none" }}>
        {searchFilteredItems.map((item) => (
          <div key={`components-${item._id}`}>
            <ApprovalBadge approved={item.approved} />
            <ApprovalActions item={item} />
          </div>
        ))}
      </div>

      {/* Return processed items and helper components */}
      <div className="approval-system-data" style={{ display: "none" }}>
        {JSON.stringify({
          items: searchFilteredItems,
          canApprove,
          selectedItems: Array.from(selectedItems),
          isUpdating,
          handleSelectItem,
          handleSelectAll,
          ApprovalBadge,
          ApprovalActions,
        })}
      </div>

      {/* No Results */}
      {searchFilteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No {config.entityNamePlural} found matching your filters
        </div>
      )}
    </div>
  );
};

// Export helper components for direct use in tables
export const createApprovalComponents = <T extends ApprovalItem>(
  approvalSystem: any
) => {
  const ApprovalBadge = ({ approved }: { approved: boolean }) => (
    <span
      className={`px-2 py-1 text-xs rounded-full flex items-center w-fit ${
        approved
          ? "bg-green-100 text-green-800 border border-green-300"
          : "bg-yellow-100 text-yellow-800 border border-yellow-300"
      }`}
    >
      {approved ? (
        <>
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </>
      ) : (
        <>
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </>
      )}
    </span>
  );

  const ApprovalActions = ({ item }: { item: T }) => {
    if (!approvalSystem.canApprove) return null;

    return (
      <div className="flex gap-1">
        {!item.approved ? (
          <Button
            variant="outline"
            size="sm"
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
            onClick={() => approvalSystem.handleApprovalChange(item._id, true)}
            disabled={approvalSystem.isUpdating === item._id}
          >
            {approvalSystem.isUpdating === item._id ? (
              <div className="flex items-center gap-5">
                <p>Approving</p>
                <Clock className="w-3 h-3 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <p>Approved</p>
                <CheckCircle className="w-3 h-3" />
              </div>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            onClick={() => approvalSystem.handleApprovalChange(item._id, false)}
            disabled={approvalSystem.isUpdating === item._id}
          >
            {approvalSystem.isUpdating === item._id ? (
              <div className="flex items-center gap-5">
                <p>Declining</p>
                <Clock className="w-3 h-3 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <p>Decline</p>
                <XCircle className="w-3 h-3" />
              </div>
            )}
          </Button>
        )}
      </div>
    );
  };

  const SelectAllCheckbox = () => (
    <Checkbox
      checked={
        approvalSystem.selectedItems.size ===
          approvalSystem.filteredItems.length &&
        approvalSystem.filteredItems.length > 0
      }
      onCheckedChange={approvalSystem.handleSelectAll}
    />
  );

  const ItemCheckbox = ({ item }: { item: T }) => (
    <Checkbox
      checked={approvalSystem.selectedItems.has(item._id)}
      onCheckedChange={(checked) =>
        approvalSystem.handleSelectItem(item._id, checked as boolean)
      }
    />
  );

  return {
    ApprovalBadge,
    ApprovalActions,
    SelectAllCheckbox,
    ItemCheckbox,
  };
};
