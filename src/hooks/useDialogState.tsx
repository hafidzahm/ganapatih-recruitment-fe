import { useState } from "react";

export function useDialogState(defaultDialogState: boolean) {
  const [open, setIsOpen] = useState<boolean>(defaultDialogState);
  return { open, setIsOpen };
}
