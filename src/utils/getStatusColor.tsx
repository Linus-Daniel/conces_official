export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'processing':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
      };
    case 'shipped':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
      };
    case 'delivered':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
      };
    case 'cancelled':
    case 'failed':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
      };
  }
}
