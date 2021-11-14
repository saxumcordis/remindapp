import React from "react";
import styles from "./MemoPage.module.scss";
import { MemoCardDeadline } from "../../components/MemoCard/MemoCardDeadline";
import classNames from "classnames";
import { Priority } from "../../ui/Icons/Priority";
import { Pinned } from "../../ui/Icons/Pinned";
import { Back } from "../../ui/Icons/Back";
import { useMemoCard } from "../../service/memoCards/useMemoCard";
import { useHistory } from "react-router";
import { EContent, TMemo } from "../../types";
import { EMemoPriorityNames } from "../../service/memoCards/service";
import { Text } from "../../ui/Icons/Text";
import { ListText } from "../../ui/Icons/ListText";
import { getContentType } from "../../service/content/content";

type Props = {
  activeMemoCard: TMemo;
};

export const MemoPageControls: React.FC<Props> = ({ activeMemoCard }) => {
  const { pinMemoCard, switchContentType } = useMemoCard();

  const history = useHistory();

  const handlePinMemoCard = () => {
    pinMemoCard(!activeMemoCard.pinned, activeMemoCard.id);
  };

  const handleReturn = () => {
    history.push("/");
  };

  const priority = EMemoPriorityNames[activeMemoCard.priority];

  const contentType = getContentType(activeMemoCard.content);
  const isStringContent = contentType === EContent.String;
  const isListContent = contentType === EContent.List;

  return (
    <div className={styles.controls}>
      <span
        className={classNames(styles.control, styles.shortControl, {
          [styles.disabled]: isStringContent,
        })}
        onClick={() =>
          isListContent && switchContentType(EContent.String, activeMemoCard.id)
        }
      >
        <Text
          className={classNames(styles.icon, {
            [styles.hoverActive]: !isStringContent,
          })}
        />
      </span>
      <span
        className={classNames(styles.control, styles.shortControl, {
          [styles.disabled]: isListContent,
        })}
        onClick={() =>
          isStringContent && switchContentType(EContent.List, activeMemoCard.id)
        }
      >
        <ListText
          className={classNames(styles.icon, {
            [styles.hoverActive]: !isListContent,
          })}
        />
      </span>
      <MemoCardDeadline deadline={activeMemoCard.deadline} />
      <span
        style={{ width: "120px", opacity: 0.5 }}
        className={classNames(styles.control, styles.hoverActive)}
      >
        <Priority className={styles.icon} priority={priority} />
        Set priority
      </span>
      <span
        style={{ width: "80px" }}
        className={classNames(styles.control, styles.hoverActive)}
        onClick={handlePinMemoCard}
      >
        <Pinned
          className={styles.icon}
          status={activeMemoCard.pinned ? "activePin" : ""}
        />
        {!activeMemoCard.pinned ? "Pin" : "Unpin"}
      </span>
      <span
        className={classNames(styles.control, styles.shortControl)}
        onClick={handleReturn}
      >
        <Back className={classNames(styles.icon, styles.hoverActive)} />
      </span>
    </div>
  );
};
