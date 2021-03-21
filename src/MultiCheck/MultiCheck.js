"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./MultiCheck.css");
const react_1 = __importDefault(require("react"));
const MultiCheck = (props) => {
    const { options, values } = props;
    return react_1.default.createElement("div", { className: 'MultiCheck' }, options.map((option, offset) => {
        return react_1.default.createElement("span", { key: offset },
            react_1.default.createElement("input", { type: "checkbox", defaultChecked: values.includes(option.value) }),
            react_1.default.createElement("label", null, option.label));
    }));
};
exports.default = MultiCheck;
