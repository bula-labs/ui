import type { Component, PropType } from "vue";
import type { AsTag } from "./types.ts";

import { defineComponent, h } from "vue";
import Slot from "./slot.ts";

export default defineComponent({
  name: "Primitive",
  inheritAttrs: false,

  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    as: {
      type: [String, Object] as PropType<AsTag | Component>,
      default: "div",
    },
  },

  setup(props, { attrs, slots }) {
    const asTag = props.asChild ? "template" : props.as;

    // For self closing tags, don't provide default slots because of hydration issue
    const SELF_CLOSING_TAGS = ["area", "img", "input"];
    if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag))
      return () => h(asTag, attrs);

    if (asTag !== "template")
      return () => h(props.as, attrs, { default: slots.default });

    return () => h(Slot, attrs, { default: slots.default });
  },
});
