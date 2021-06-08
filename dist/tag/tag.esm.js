import { openBlock, createBlock, renderSlot, createCommentVNode, createVNode, toDisplayString } from 'vue';

var script = {
    name: 'Tag',
    props: {
        value: null,
        severity: null,
        rounded: Boolean,
        icon: String
    },
    computed: {
        containerClass() {
            return ['p-tag p-component', {
                'p-tag-info': this.severity === 'info',
                'p-tag-success': this.severity === 'success',
                'p-tag-warning': this.severity === 'warning',
                'p-tag-danger': this.severity === 'danger',
                'p-tag-rounded': this.rounded
            }];
        },
        iconClass() {
            return ['p-tag-icon', this.icon];
        }
    }
};

const _hoisted_1 = { class: "p-tag-value" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("span", { class: $options.containerClass }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      ($props.icon)
        ? (openBlock(), createBlock("span", {
            key: 0,
            class: $options.iconClass
          }, null, 2))
        : createCommentVNode("", true),
      createVNode("span", _hoisted_1, toDisplayString($props.value), 1)
    ])
  ], 2))
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

var css_248z = "\n.p-tag {\r\n    display: -webkit-inline-box;\r\n    display: -ms-inline-flexbox;\r\n    display: inline-flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\n}\n.p-tag-icon,\r\n.p-tag-value,\r\n.p-tag-icon.pi {\r\n    line-height: 1.5;\n}\n.p-tag.p-tag-rounded {\r\n    border-radius: 10rem;\n}\r\n";
styleInject(css_248z);

script.render = render;

export default script;
