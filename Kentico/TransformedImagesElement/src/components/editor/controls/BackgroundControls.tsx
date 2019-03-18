﻿import * as React from "react";

import { BaseControls, IBaseControlsProps } from "./BaseControls";
import { IBackgroundTransform } from "../../../types/transformedImage/Transforms";
import { Color } from "../../../types/transformedImage/Color";

import ColorPicker from "../inputs/ColorPicker";
import { ColorInput, ColorInputType } from "../inputs/ColorInput";

export interface IBackgroundControlsProps extends IBaseControlsProps<IBackgroundTransform> {
}

export interface IBackgroundControlsState {
    pickerOpen: boolean;
}

export class BackgroundControls extends BaseControls<IBackgroundControlsProps, IBackgroundTransform, IBackgroundControlsState> {
    private emptyColor: Color = new Color({ r: 0, g: 0, b: 0 });

    state: IBackgroundControlsState = {
        pickerOpen: false
    }

    onClickSidebar(): void {
        if (this.state.pickerOpen) {
            this.setState({ pickerOpen: false });
        }
    }

    onMouseDown = () => false;

    onMouseMove = () => false;

    onMouseUp = () => false;

    getImageOverlay() {
        return (
            <div>
            </div>
        );
    }

    renderControls() {
        const background = this.props.transform;

        return (
            <div>
                <div className="fields">
                    <ColorInput
                        type={ColorInputType.hex}
                        value={background.color || this.emptyColor}
                        tooltip="Canvas color"
                        isLabelFirst={true}
                        setValue={value => {
                            this.setTransform({ color: value })
                        }}
                    />
                    <ColorPicker
                        isPickerOpen={this.state.pickerOpen}
                        togglePicker={() => this.setState(state => {
                            return {
                                pickerOpen: !state.pickerOpen
                            }
                        })}
                        value={background.color || this.emptyColor}
                        tooltip="Pick a color"
                        setValue={value => {
                            this.setTransform({
                                color: Color.fromPickerFormat(value.rgb)
                            })
                        }}
                    />
                </div>
            </div>
        );
    }
}