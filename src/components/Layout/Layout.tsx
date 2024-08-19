import { ErrorBoundary } from '@components/ErrorBoundary';
import { FC, PropsWithChildren } from 'react';
import classes from './Layout.module.css';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className={classes.header}>
        <h1 className={classes.heading}>Calories calculator</h1>
      </header>
      <main className={classes.content}>
        <ErrorBoundary fallback={<div className={classes.errorContainer}>Something really went wrong!</div>}>{children}</ErrorBoundary>
      </main>
    </>
  );
};

export { Layout };
