import { resolveComponent, openBlock, createBlock, Fragment, withCtx, createVNode, createCommentVNode, toDisplayString, resolveDynamicComponent, renderList } from 'vue';

var script$1 = {
    name: 'BreadcrumbItem',
    props: {
        item: null,
        template: null
    },
    methods: {
        onClick(event, navigate) {
            if (this.item.command) {
                this.item.command({
                    originalEvent: event,
                    item: this.item
                });
            }

            if (this.item.to && navigate) {
                navigate(event);
            }
        },
        visible() {
            return (typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false);
        }
    },
    computed: {
        containerClass() {
            return [{'p-disabled': this.item.disabled}, this.item.class];
        },
        iconClass() {
            return ['p-menuitem-icon', this.item.icon];
        }
    }
};

const _hoisted_1$1 = {
  key: 1,
  class: "p-menuitem-text"
};
const _hoisted_2$1 = {
  key: 1,
  class: "p-menuitem-text"
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = resolveComponent("router-link");

  return ($options.visible())
    ? (openBlock(), createBlock("li", {
        key: 0,
        class: $options.containerClass
      }, [
        (!$props.template)
          ? (openBlock(), createBlock(Fragment, { key: 0 }, [
              ($props.item.to)
                ? (openBlock(), createBlock(_component_router_link, {
                    key: 0,
                    to: $props.item.to,
                    custom: ""
                  }, {
                    default: withCtx(({navigate, href}) => [
                      createVNode("a", {
                        href: href,
                        class: "p-menuitem-link",
                        onClick: $event => ($options.onClick($event, navigate))
                      }, [
                        ($props.item.icon)
                          ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: $options.iconClass
                            }, null, 2))
                          : createCommentVNode("", true),
                        ($props.item.label)
                          ? (openBlock(), createBlock("span", _hoisted_1$1, toDisplayString($props.item.label), 1))
                          : createCommentVNode("", true)
                      ], 8, ["href", "onClick"])
                    ]),
                    _: 1
                  }, 8, ["to"]))
                : (openBlock(), createBlock("a", {
                    key: 1,
                    href: $props.item.url||'#',
                    class: "p-menuitem-link",
                    onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
                    target: $props.item.target
                  }, [
                    ($props.item.icon)
                      ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: $options.iconClass
                        }, null, 2))
                      : createCommentVNode("", true),
                    ($props.item.label)
                      ? (openBlock(), createBlock("span", _hoisted_2$1, toDisplayString($props.item.label), 1))
                      : createCommentVNode("", true)
                  ], 8, ["href", "target"]))
            ], 64))
          : (openBlock(), createBlock(resolveDynamicComponent($props.template), {
              key: 1,
              item: $props.item
            }, null, 8, ["item"]))
      ], 2))
    : createCommentVNode("", true)
}

script$1.render = render$1;

var script = {
    name: 'Breadcrumb',
    props: {
        model: {
            type: Array,
            default: null
        },
        home: {
            type: null,
            default: null
        }
    },
    components: {
        'BreadcrumbItem': script$1
    }
};

const _hoisted_1 = {
  class: "p-breadcrumb p-component",
  "aria-label": "Breadcrumb"
};
const _hoisted_2 = /*#__PURE__*/createVNode("li", { class: "p-breadcrumb-chevron pi pi-chevron-right" }, null, -1);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BreadcrumbItem = resolveComponent("BreadcrumbItem");

  return (openBlock(), createBlock("nav", _hoisted_1, [
    createVNode("ul", null, [
      ($props.home)
        ? (openBlock(), createBlock(_component_BreadcrumbItem, {
            key: 0,
            item: $props.home,
            class: "p-breadcrumb-home",
            template: _ctx.$slots.item
          }, null, 8, ["item", "template"]))
        : createCommentVNode("", true),
      (openBlock(true), createBlock(Fragment, null, renderList($props.model, (item) => {
        return (openBlock(), createBlock(Fragment, {
          key: item.label
        }, [
          _hoisted_2,
          createVNode(_component_BreadcrumbItem, {
            item: item,
            template: _ctx.$slots.item
          }, null, 8, ["item", "template"])
        ], 64))
      }), 128))
    ])
  ]))
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

var css_248z = "\n.p-breadcrumb ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style-type: none;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\n}\n.p-breadcrumb .p-menuitem-text {\r\n    line-height: 1;\n}\n.p-breadcrumb .p-menuitem-link {\r\n    text-decoration: none;\n}\r\n";
styleInject(css_248z);

script.render = render;

export default script;
