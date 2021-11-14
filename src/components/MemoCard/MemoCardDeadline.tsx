import classNames from "classnames";
import { Deadline } from "../../ui/Icons/Deadline";
import React, { useState } from "react";

import DatePicker from "react-datepicker";

import styles from "../../pages/MemoPage/MemoPage.module.scss";

type Props = {
  deadline?: string;
};

export const MemoCardDeadline: React.FC<Props> = (deadline) => {
  const [setting, setSetting] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<any>(new Date());

  return (
    <span
      style={{ width: "120px", opacity: 0.5 }}
      className={classNames(styles.control, styles.hoverActive)}
    >
      <Deadline
        className={styles.icon}
        status={deadline ? "active" : ""}
        onClick={() => setSetting(true)}
      />
      {!setting ? (
        "Set deadline"
      ) : (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      )}
    </span>
  );
};
