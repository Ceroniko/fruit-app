import ChevronDown from '@icons/chevron-down.svg';
import { FC, PropsWithChildren, ReactNode, useId, useState } from 'react';
import classes from './Accordion.module.css';

type AccordionProps = { label: string; additionalContent: ReactNode };

const Accordion: FC<PropsWithChildren<AccordionProps>> = ({ label, additionalContent, children }) => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  const triggerID = `trigger_${id}`;
  const panelID = `panel_${id}`;

  return (
    <div aria-hidden className={classes.wrapper}>
      <h3>
        <button
          id={triggerID}
          aria-controls={panelID}
          aria-expanded={isExpanded}
          className={classes.accordionTrigger}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <ChevronDown className={classes.accordionIcon} />

          <span className={classes.accordionTriggerLabel} title={label}>
            {label}
          </span>

          {additionalContent && (
            <div aria-hidden className={classes.accordionTriggerAdditionalContent} onClick={(event) => event.stopPropagation()}>
              {additionalContent}
            </div>
          )}
        </button>
      </h3>
      <div role="region" data-expand={isExpanded} id={panelID} aria-labelledby={triggerID} className={classes.accordionPanel}>
        <div className={classes.accordionPanelWrapper}>{children}</div>
      </div>
    </div>
  );
};

export { Accordion };
