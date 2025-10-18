import { type FC, type ReactElement, type ReactNode, useState } from "react";

type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children?: ReactNode;
};

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({
  fallback,
  children,
}): ReactNode => {
  const [error, setError] = useState<unknown>(undefined);

  if (error) {
    return (
      fallback ?? (
        <div style={{ color: "crimson" }}>
          Failed to load remote. {String(error)}
        </div>
      )
    );
  }

  return <ErrorCatcher onError={setError}>{children}</ErrorCatcher>;
};

const ErrorCatcher = ({
  onError,
  children,
}: {
  onError: (error: unknown) => void;
  children?: ReactNode;
}): ReactElement | null => {
  try {
    return <>{children}</>;
  } catch (error) {
    onError(error);
    return null;
  }
};
