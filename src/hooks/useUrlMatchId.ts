import { useNavigate, useSearch } from "@tanstack/react-router";

export const useUrlMatchId = () => {
  const { replay: urlMatchId } = useSearch({ from: "/" });
  const navigate = useNavigate({ from: "/" });

  function setUrlMatchId(newUrlMatchId: string | null) {
    navigate({ search: { replay: newUrlMatchId ?? undefined } });
  }

  return { urlMatchId: urlMatchId ?? null, setUrlMatchId };
};
