import React from "react";
import Select, { components } from "react-select";
import { onlyUpdateForKeys, compose, mapProps } from "recompose";
import omit from "lodash/fp/omit";

export default function CurrencyInput(props) {
  const {
    assets,
    defaultAsset,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;
  const omitProps = (...keys) => mapProps(omit(keys));
  const FastOption = compose(
    onlyUpdateForKeys(["isDisabled", "isSelected"]),
    omitProps("isFocused")
  )(components.Option);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginRight: "20px",
        marginLeft: "20px",
      }}
    >
      <input
        style={{
          marginRight: "20px",
          borderRadius: "4px",
          borderWidth: "1px",
          borderColor: "hsl(0,0%,80%)",
        }}
        type="number"
        value={amount}
        onChange={onChangeAmount}
      />
      <div style={{ width: "120px" }}>
        <Select
          components={{
            Option: FastOption,
          }}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.asset_id}
          defaultValue={defaultAsset}
          defaultInputValue={defaultAsset}
          onChange={onChangeCurrency}
          label="Single select"
          options={assets}
          styles={{
            option: (style, state) => ({
              ...style,
              "&:hover": {
                backgroundColor: state.theme.colors.primary25,
                color: state.theme.colors.neutral90,
              },
            }),
          }}
        />
      </div>
    </div>
  );
}
