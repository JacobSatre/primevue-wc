import { openBlock, createBlock, createVNode, mergeProps, withKeys, withModifiers } from 'vue';

var script = {
    name: 'InputSwitch',
    inheritAttrs: false,
    emits: ['update:modelValue', 'click', 'change'],
    props: {
        modelValue: Boolean,
        class: null,
        style: null
    },
    data() {
        return {
            focused: false
        }
    },
    methods: {
        onClick(event) {
            if (!this.$attrs.disabled) {
                this.$emit('click', event);
                this.$emit('update:modelValue', !this.modelValue);
                this.$emit('change', event);
                this.$refs.input.focus();
            }
            event.preventDefault();
        },
        onFocus() {
            this.focused = true;
        },
        onBlur() {
            this.focused = false;
        }
    },
    computed: {
        containerClass() {
            return [
                'p-inputswitch p-component', this.class,
                {
                    'p-inputswitch-checked': this.modelValue,
					'p-disabled': this.$attrs.disabled,
                    'p-focus': this.focused
                }
            ];
        }
    }
};

const _hoisted_1 = { class: "p-hidden-accessible" };
const _hoisted_2 = /*#__PURE__*/createVNode("span", { class: "p-inputswitch-slider" }, null, -1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: $options.containerClass,
    onClick: _cache[4] || (_cache[4] = $event => ($options.onClick($event))),
    style: $props.style
  }, [
    createVNode("div", _hoisted_1, [
      createVNode("input", mergeProps({
        ref: "input",
        type: "checkbox",
        checked: $props.modelValue
      }, _ctx.$attrs, {
        onFocus: _cache[1] || (_cache[1] = $event => ($options.onFocus($event))),
        onBlur: _cache[2] || (_cache[2] = $event => ($options.onBlur($event))),
        onKeydown: _cache[3] || (_cache[3] = withKeys(withModifiers($event => ($options.onClick($event)), ["prevent"]), ["enter"])),
        role: "switch",
        "aria-checked": $props.modelValue
      }), null, 16, ["checked", "aria-checked"])
    ]),
    _hoisted_2
  ], 6))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-inputswitch {\r\n    position: relative;\r\n    display: inline-block;\n}\n.p-inputswitch-slider {\r\n    position: absolute;\r\n    cursor: pointer;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\n}\n.p-inputswitch-slider:before {\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 50%;\n}\r\n";
styleInject(css_248z);

script.render = render;

export default script;
