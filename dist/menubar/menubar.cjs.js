'use strict';

var utils = require('primevue/utils');
var Ripple = require('primevue/ripple');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$1 = {
    name: 'MenubarSub',
    emits: ['keydown-item', 'leaf-click'],
    props: {
        model: {
            type: Array,
            default: null
        },
        root: {
            type: Boolean,
            default: false
        },
        popup: {
            type: Boolean,
            default: false
        },
        parentActive: {
            type: Boolean,
            default: false
        },
        mobileActive: {
            type: Boolean,
            default: false
        },
        template: {
            type: Object,
            default: null
        }
    },
    documentClickListener: null,
    watch: {
        parentActive(newValue) {
            if (!newValue) {
                this.activeItem = null;
            }
        }
    },
    data() {
        return {
            activeItem: null
        }
    },
    updated() {
        if (this.root && this.activeItem) {
            this.bindDocumentClickListener();
        }
    },
    beforeUnmount() {
        this.unbindDocumentClickListener();
    },
    methods: {
        onItemMouseEnter(event, item) {
            if (item.disabled || this.mobileActive) {
                event.preventDefault();
                return;
            }

            if (this.root) {
                if (this.activeItem || this.popup) {
                    this.activeItem = item;
                }
            }
            else {
                this.activeItem = item;
            }
        },
        onItemClick(event, item, navigate) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }

            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }

            if (item.items) {
                if (this.activeItem && item === this.activeItem)
                    this.activeItem = null;
                else
                   this.activeItem = item;
            }

            if (!item.items) {
                this.onLeafClick();
            }

            if (item.to && navigate) {
                navigate(event);
            }
        },
        onLeafClick() {
            this.activeItem = null;
            this.$emit('leaf-click');
        },
        onItemKeyDown(event, item) {
            let listItem = event.currentTarget.parentElement;

            switch(event.which) {
                //down
                case 40:
                    if (this.root) {
                        if (item.items) {
                            this.expandSubmenu(item, listItem);
                        }
                    }
                    else {
                        this.navigateToNextItem(listItem);
                    }

                    event.preventDefault();
                break;

                //up
                case 38:
                    if (!this.root) {
                        this.navigateToPrevItem(listItem);
                    }

                    event.preventDefault();
                break;

                //right
                case 39:
                    if (this.root) {
                        var nextItem = this.findNextItem(listItem);
                        if (nextItem) {
                            nextItem.children[0].focus();
                        }
                    }
                    else {
                        if (item.items) {
                            this.expandSubmenu(item, listItem);
                        }
                    }

                    event.preventDefault();
                break;

                //left
                case 37:
                    if (this.root) {
                        this.navigateToPrevItem(listItem);
                    }

                    event.preventDefault();
                break;
            }

            this.$emit('keydown-item', {
                originalEvent: event,
                element: listItem
            });
        },
        onChildItemKeyDown(event) {
            if (this.root) {
                //up
                if (event.originalEvent.which === 38 && event.element.previousElementSibling == null) {
                    this.collapseMenu(event.element);
                }
            }
            else {
                //left
                if (event.originalEvent.which === 37) {
                    this.collapseMenu(event.element);
                }
            }
        },
        findNextItem(item) {
            let nextItem = item.nextElementSibling;

            if (nextItem)
                return utils.DomHandler.hasClass(nextItem, 'p-disabled') || !utils.DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;
            else
                return null;
        },
        findPrevItem(item) {
            let prevItem = item.previousElementSibling;

            if (prevItem)
                return utils.DomHandler.hasClass(prevItem, 'p-disabled') || !utils.DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;
            else
                return null;
        },
        expandSubmenu(item, listItem) {
            this.activeItem = item;

            setTimeout(() => {
                listItem.children[1].children[0].children[0].focus();
            }, 50);
        },
        collapseMenu(listItem) {
            this.activeItem = null;
            listItem.parentElement.previousElementSibling.focus();
        },
        navigateToNextItem(listItem) {
            var nextItem = this.findNextItem(listItem);
            if (nextItem) {
                nextItem.children[0].focus();
            }
        },
        navigateToPrevItem(listItem) {
            var prevItem = this.findPrevItem(listItem);
            if (prevItem) {
                prevItem.children[0].focus();
            }
        },
        getItemClass(item) {
            return [
                'p-menuitem', item.class, {
                    'p-menuitem-active': this.activeItem === item
                }
            ]
        },
        getLinkClass(item) {
            return ['p-menuitem-link', {'p-disabled': item.disabled}];
        },
        bindDocumentClickListener() {
            if (!this.documentClickListener) {
                this.documentClickListener = (event) => {
                    if (this.$el && !this.$el.contains(event.composedPath()[0])) {
                        this.activeItem = null;
                        this.unbindDocumentClickListener();
                    }
                };

                document.addEventListener('click', this.documentClickListener);
            }
        },
        unbindDocumentClickListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        },
        getSubmenuIcon() {
            return [
                'p-submenu-icon pi', {'pi-angle-right': !this.root, 'pi-angle-down': this.root}
            ];
        },
        visible(item) {
            return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
        }
    },
    computed: {
        containerClass() {
            return {'p-submenu-list': !this.root, 'p-menubar-root-list': this.root};
        }
    },
    directives: {
        'ripple': Ripple__default['default']
    }
};

const _hoisted_1$1 = { class: "p-menuitem-text" };
const _hoisted_2$1 = { class: "p-menuitem-text" };

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_link = vue.resolveComponent("router-link");
  const _component_MenubarSub = vue.resolveComponent("MenubarSub", true);
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createBlock("ul", {
    class: $options.containerClass,
    role: $props.root ? 'menubar' : 'menu'
  }, [
    (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($props.model, (item, i) => {
      return (vue.openBlock(), vue.createBlock(vue.Fragment, {
        key: item.label + i.toString()
      }, [
        ($options.visible(item) && !item.separator)
          ? (vue.openBlock(), vue.createBlock("li", {
              key: 0,
              role: "none",
              class: $options.getItemClass(item),
              style: item.style,
              onMouseenter: $event => ($options.onItemMouseEnter($event, item))
            }, [
              (!$props.template)
                ? (vue.openBlock(), vue.createBlock(vue.Fragment, { key: 0 }, [
                    (item.to && !item.disabled)
                      ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                          key: 0,
                          to: item.to,
                          custom: ""
                        }, {
                          default: vue.withCtx(({navigate, href}) => [
                            vue.withDirectives(vue.createVNode("a", {
                              href: href,
                              onClick: $event => ($options.onItemClick($event, item, navigate)),
                              class: $options.getLinkClass(item),
                              onKeydown: $event => ($options.onItemKeyDown($event, item)),
                              role: "menuitem"
                            }, [
                              vue.createVNode("span", {
                                class: ['p-menuitem-icon', item.icon]
                              }, null, 2),
                              vue.createVNode("span", _hoisted_1$1, vue.toDisplayString(item.label), 1)
                            ], 42, ["href", "onClick", "onKeydown"]), [
                              [_directive_ripple]
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"]))
                      : vue.withDirectives((vue.openBlock(), vue.createBlock("a", {
                          key: 1,
                          href: item.url,
                          class: $options.getLinkClass(item),
                          target: item.target,
                          "aria-haspopup": item.items != null,
                          "aria-expanded": item === $data.activeItem,
                          onClick: $event => ($options.onItemClick($event, item)),
                          onKeydown: $event => ($options.onItemKeyDown($event, item)),
                          role: "menuitem",
                          tabindex: item.disabled ? null : '0'
                        }, [
                          vue.createVNode("span", {
                            class: ['p-menuitem-icon', item.icon]
                          }, null, 2),
                          vue.createVNode("span", _hoisted_2$1, vue.toDisplayString(item.label), 1),
                          (item.items)
                            ? (vue.openBlock(), vue.createBlock("span", {
                                key: 0,
                                class: $options.getSubmenuIcon()
                              }, null, 2))
                            : vue.createCommentVNode("", true)
                        ], 42, ["href", "target", "aria-haspopup", "aria-expanded", "onClick", "onKeydown", "tabindex"])), [
                          [_directive_ripple]
                        ])
                  ], 64))
                : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
                    key: 1,
                    item: item
                  }, null, 8, ["item"])),
              ($options.visible(item) && item.items)
                ? (vue.openBlock(), vue.createBlock(_component_MenubarSub, {
                    model: item.items,
                    key: item.label + '_sub_',
                    mobileActive: $props.mobileActive,
                    onLeafClick: $options.onLeafClick,
                    onKeydownItem: $options.onChildItemKeyDown,
                    parentActive: item === $data.activeItem,
                    template: $props.template
                  }, null, 8, ["model", "mobileActive", "onLeafClick", "onKeydownItem", "parentActive", "template"]))
                : vue.createCommentVNode("", true)
            ], 46, ["onMouseenter"]))
          : vue.createCommentVNode("", true),
        ($options.visible(item) && item.separator)
          ? (vue.openBlock(), vue.createBlock("li", {
              class: ['p-menu-separator', item.class],
              style: item.style,
              key: 'separator' + i.toString(),
              role: "separator"
            }, null, 6))
          : vue.createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 10, ["role"]))
}

script$1.render = render$1;

var script = {
    name: 'Menubar',
    props: {
		model: {
            type: Array,
            default: null
        }
    },
    outsideClickListener: null,
    data() {
        return {
            mobileActive: false
        }
    },
    beforeUnmount() {
        this.mobileActive = false;
        this.unbindOutsideClickListener();
        if (this.$refs.rootmenu && this.$refs.rootmenu.$el) {
            utils.ZIndexUtils.clear(this.$refs.rootmenu.$el);
        }
    },
    methods: {
        toggle(event) {
            if (this.mobileActive) {
                this.mobileActive = false;
                utils.ZIndexUtils.clear(this.$refs.rootmenu.$el);
            }
            else {
                this.mobileActive = true;
                utils.ZIndexUtils.set('menu', this.$refs.rootmenu.$el, this.$primevue.config.zIndex.menu);
            }

            this.bindOutsideClickListener();
            event.preventDefault();
        },
        bindOutsideClickListener() {
            if (!this.outsideClickListener) {
                this.outsideClickListener = (event) => {
                    if (this.mobileActive && this.$refs.rootmenu.$el !== event.composedPath()[0] && !this.$refs.rootmenu.$el.contains(event.composedPath()[0])
                        && this.$refs.menubutton !== event.composedPath()[0] && !this.$refs.menubutton.contains(event.composedPath()[0])) {
                        this.mobileActive = false;
                    }
                };
                document.addEventListener('click', this.outsideClickListener);
            }
        },
        unbindOutsideClickListener() {
            if (this.outsideClickListener) {
                document.removeEventListener('click', this.outsideClickListener);
                this.outsideClickListener = null;
            }
        },
        onLeafClick() {
            this.mobileActive = false;
        }
    },
    computed: {
        containerClass() {
            return ['p-menubar p-component', {'p-menubar-mobile-active': this.mobileActive}];
        }
    },
    components: {
        'MenubarSub': script$1
    }
};

const _hoisted_1 = {
  key: 0,
  class: "p-menubar-start"
};
const _hoisted_2 = /*#__PURE__*/vue.createVNode("i", { class: "pi pi-bars" }, null, -1);
const _hoisted_3 = {
  key: 1,
  class: "p-menubar-end"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_MenubarSub = vue.resolveComponent("MenubarSub");

  return (vue.openBlock(), vue.createBlock("div", { class: $options.containerClass }, [
    (_ctx.$slots.start)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
          vue.renderSlot(_ctx.$slots, "start")
        ]))
      : vue.createCommentVNode("", true),
    vue.createVNode("a", {
      ref: "menubutton",
      tabindex: "0",
      class: "p-menubar-button",
      onClick: _cache[1] || (_cache[1] = $event => ($options.toggle($event)))
    }, [
      _hoisted_2
    ], 512),
    vue.createVNode(_component_MenubarSub, {
      ref: "rootmenu",
      model: $props.model,
      root: true,
      mobileActive: $data.mobileActive,
      onLeafClick: $options.onLeafClick,
      template: _ctx.$slots.item
    }, null, 8, ["model", "mobileActive", "onLeafClick", "template"]),
    (_ctx.$slots.end)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_3, [
          vue.renderSlot(_ctx.$slots, "end")
        ]))
      : vue.createCommentVNode("", true)
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

var css_248z = "\n.p-menubar {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\n}\n.p-menubar ul {\r\n    margin: 0;\r\n    padding: 0;\r\n    list-style: none;\n}\n.p-menubar .p-menuitem-link {\r\n    cursor: pointer;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    text-decoration: none;\r\n    overflow: hidden;\r\n    position: relative;\n}\n.p-menubar .p-menuitem-text {\r\n    line-height: 1;\n}\n.p-menubar .p-menuitem {\r\n    position: relative;\n}\n.p-menubar-root-list {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\n}\n.p-menubar-root-list > li ul {\r\n    display: none;\r\n    z-index: 1;\n}\n.p-menubar-root-list > .p-menuitem-active > .p-submenu-list {\r\n    display: block;\n}\n.p-menubar .p-submenu-list {\r\n    display: none;\r\n    position: absolute;\r\n    z-index: 1;\n}\n.p-menubar .p-submenu-list > .p-menuitem-active > .p-submenu-list  {\r\n    display: block;\r\n    left: 100%;\r\n    top: 0;\n}\n.p-menubar .p-submenu-list .p-menuitem-link .p-submenu-icon {\r\n    margin-left: auto;\n}\n.p-menubar .p-menubar-custom,\r\n.p-menubar .p-menubar-end {\r\n    margin-left: auto;\r\n    -ms-flex-item-align: center;\r\n        align-self: center;\n}\n.p-menubar-button {\r\n    display: none;\r\n    cursor: pointer;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
