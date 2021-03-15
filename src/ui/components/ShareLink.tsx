import {
  Button,
  Input,
  Section,
  SectionBlock,
  SectionTitle,
} from "figma-react-ui-kit";
import React, { useCallback, useEffect, useState } from "react";
import { checkSharedLink, getFileKey } from "../helpers";

type Props = {
  onSetFileKey: (value: string) => void;
};

export const ShareLink = ({ onSetFileKey }: Props) => {
  const [value, setValue] = useState("");
  const [isValid, setValid] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = () => {
    if (isValid) {
      const fileKey = getFileKey(value);
      onSetFileKey(fileKey || "");
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  };

  useEffect(() => {
    setValid(checkSharedLink(value + Math.random().toString().slice(5, 10)));
  }, [value]);

  return (
    <Section className="section-flex-center">
      <SectionBlock>
        <SectionTitle>
          <span style={{ fontSize: 14 }}>
            Paste your <strong>shared link</strong> into the input
          </span>
        </SectionTitle>
      </SectionBlock>
      <SectionBlock className="full-section-block">
        <Input
          autoFocus
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Button type="submit" disabled={!isValid} onClick={onClick}>
          Get all images
        </Button>
      </SectionBlock>
    </Section>
  );
};
