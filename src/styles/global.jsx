import { Platform } from 'react-native';

export const colour = {
    "colour-background-button--disabled": "#B3BDC6",
    "colour-background-button--active": "#353B40",
    "colour-background-input": "#374151",
    "colour-background-info": "#EDF0F2",
    "colour-border-input-default": "#525B64",
    "colour-border-input-number--focused": "#E5E7EB",
    "colour-border-input-number--unfocused": "#8D9AA5",
    "color-number-input-default": "#FFD43C",
    "colour-text-body-default": "#000",
    "colour-text-button": "#EBF4FF",
    "colour-text-button-1": "#052C62",
    "colour-text-error": "#6E7B87",
    "colour-text-input-default": "#fff",
    "colour-text-input-placeholder": "#B3BDC6",
    "colour-input-invalid":"#f56983"
}

export const fontSize = {
    "font-size-0": 10,
    "font-size-1": 12,
    "font-size-2": 14,
    "font-size-3": 16,
    "font-size-4": 18,
    "font-size-5": 20,
    "font-size-6": 24,

}

export const lineHeight = {
    "line-height-heading": 20,
    "line-height-text": 14
}

export const fontWeight = {
    "font-weight-1" : "400",
    "font-weight-2" : "500",
    "font-weight-3" : "700",
    "font-weight-4" : Platform.OS == "android" ? "700" : "800",
}

export const borderRadius = {
    "border-radius-1": 2,
    "border-radius-2": 4,
    "border-radius-3": 6,
    "border-radius-4": 8,
    "border-radius-5": 10,
    "border-radius-6": 12,

}
