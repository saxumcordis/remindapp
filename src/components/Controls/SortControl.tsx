import React, { useRef } from "react";
import { useHover } from "../../service/hooks/useHover";
import classNames from "classnames";
import styles from "./Controls.module.scss";
import { Sort } from "../../ui/Icons/Sort";
import { AlphabetSort } from "../../ui/Icons/AlphabetSort";
import { DateSort } from "../../ui/Icons/DateSort";
import { UpdateDateSort } from "../../ui/Icons/UpdateDateSort";
import { SortDirection } from "../../ui/Icons/SortDirection";
import {
  EFilter,
  EFilterOrder,
  useFiltering,
} from "../../service/memoCards/useFiltering";
import { Priority } from "../../ui/Icons/Priority";
import { Deadline } from "../../ui/Icons/Deadline";

export const SortControl: React.FC = () => {
  const { filterOrder, filter, setFilterOrder, setFilter } = useFiltering();

  const hoverRef = useRef(null);
  const isHovered = useHover(hoverRef);

  const handleSettingFilter = (filter: EFilter) => {
    setFilter(filter);
  };

  const handleFilterOrder = (filterOrder: EFilterOrder) => {
    setFilterOrder(filterOrder);
  };

  return (
    <button
      className={classNames(styles.sort, {
        [styles.sortHovered]: isHovered,
        [styles.sortHoveredBig]: isHovered,
        [styles.rotated]: isHovered,
      })}
      ref={hoverRef}
    >
      <Sort className={styles.icon} />
      {isHovered && (
        <div className={styles.sortControls}>
          <AlphabetSort
            className={classNames(styles.icon, {
              [styles.active]: filter === EFilter.title,
            })}
            onClick={() => handleSettingFilter(EFilter.title)}
          />
          <DateSort
            className={classNames(styles.icon, {
              [styles.active]: filter === EFilter.createdTs,
            })}
            onClick={() => handleSettingFilter(EFilter.createdTs)}
          />
          <UpdateDateSort
            className={classNames(styles.icon, {
              [styles.active]: filter === EFilter.modifiedTime,
            })}
            onClick={() => handleSettingFilter(EFilter.modifiedTime)}
          />
          <Priority
            className={classNames(styles.icon, {
              [styles.active]: filter === EFilter.priority,
            })}
            onClick={() => handleSettingFilter(EFilter.priority)}
          />
          <Deadline
            className={classNames(styles.icon, {
              [styles.active]: filter === EFilter.deadline,
            })}
            onClick={() => handleSettingFilter(EFilter.deadline)}
          />
          <SortDirection
            className={classNames(styles.icon, styles.sortDirection, {
              [styles.active]: filterOrder === EFilterOrder.DESC,
            })}
            onClick={() => handleFilterOrder(EFilterOrder.DESC)}
          />
          <SortDirection
            className={classNames(
              styles.icon,
              styles.sortDirection,
              styles.sortDirectionRotated,
              { [styles.active]: filterOrder === EFilterOrder.ASC }
            )}
            onClick={() => handleFilterOrder(EFilterOrder.ASC)}
          />
        </div>
      )}
    </button>
  );
};
