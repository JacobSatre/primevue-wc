'use strict';

var ToastEventBus = require('primevue/toasteventbus');
var Ripple = require('primevue/ripple');
var vue = require('vue');
var utils = require('primevue/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ToastEventBus__default = /*#__PURE__*/_interopDefaultLegacy(ToastEventBus);
var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

var script$1 = {
    name: 'ToastMessage',
    emits: ['close'],
    props: {
        message: null
    },
    closeTimeout: null,
    mounted() {
        if (this.message.life) {
            this.closeTimeout = setTimeout(() => {
                this.close();
            }, this.message.life);
        }
    },
    methods: {
        close() {
            this.$emit('close', this.message);
        },
        onCloseClick() {
            if (this.closeTimeout) {
                clearTimeout(this.closeTimeout);
            }

            this.close();
        }
    },
    computed: {
        containerClass() {
            return ['p-toast-message', {
                'p-toast-message-info': this.message.severity === 'info',
                'p-toast-message-warn': this.message.severity === 'warn',
                'p-toast-message-error': this.message.severity === 'error',
                'p-toast-message-success': this.message.severity === 'success'
            }];
        },
        iconClass() {
            return ['p-toast-message-icon pi', {
                'pi-info-circle': this.message.severity === 'info',
                'pi-exclamation-triangle': this.message.severity === 'warn',
                'pi-times': this.message.severity === 'error',
                'pi-check': this.message.severity === 'success'
            }];
        }
    },
    directives: {
        'ripple': Ripple__default['default']
    }
};

const _hoisted_1 = { class: "p-toast-message-content" };
const _hoisted_2 = { class: "p-toast-message-text" };
const _hoisted_3 = { class: "p-toast-summary" };
const _hoisted_4 = { class: "p-toast-detail" };
const _hoisted_5 = /*#__PURE__*/vue.createVNode("span", { class: "p-toast-icon-close-icon pi pi-times" }, null, -1);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_ripple = vue.resolveDirective("ripple");

  return (vue.openBlock(), vue.createBlock("div", {
    class: $options.containerClass,
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, [
    vue.createVNode("div", _hoisted_1, [
      vue.createVNode("span", { class: $options.iconClass }, null, 2),
      vue.createVNode("div", _hoisted_2, [
        vue.createVNode("span", _hoisted_3, vue.toDisplayString($props.message.summary), 1),
        vue.createVNode("div", _hoisted_4, vue.toDisplayString($props.message.detail), 1)
      ]),
      ($props.message.closable !== false)
        ? vue.withDirectives((vue.openBlock(), vue.createBlock("button", {
            key: 0,
            class: "p-toast-icon-close p-link",
            onClick: _cache[1] || (_cache[1] = (...args) => ($options.onCloseClick && $options.onCloseClick(...args))),
            type: "button"
          }, [
            _hoisted_5
          ], 512)), [
            [_directive_ripple]
          ])
        : vue.createCommentVNode("", true)
    ])
  ], 2))
}

script$1.render = render$1;

var messageIdx = 0;

var script = {
    name: 'Toast',
    inheritAttrs: false,
    props: {
        group: {
            type: String,
            default: null
        },
        position: {
            type: String,
            default: 'top-right'
        },
        autoZIndex: {
            type: Boolean,
            default: true
        },
        baseZIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            messages: []
        }
    },
    mounted() {
        ToastEventBus__default['default'].on('add', this.onAdd);
        ToastEventBus__default['default'].on('remove-group', this.onRemoveGroup);
        ToastEventBus__default['default'].on('remove-all-groups', this.onRemoveAllGroups);

        if (this.autoZIndex) {
            utils.ZIndexUtils.set('modal', this.$refs.container, this.baseZIndex || this.$primevue.config.zIndex.modal);
        }
    },
    beforeUnmount() {
        if (this.$refs.container && this.autoZIndex) {
            utils.ZIndexUtils.clear(this.$refs.container);
        }

        ToastEventBus__default['default'].off('add', this.onAdd);
        ToastEventBus__default['default'].off('remove-group', this.onRemoveGroup);
        ToastEventBus__default['default'].off('remove-all-groups', this.onRemoveAllGroups);
    },
    methods: {
        add(message) {
            if (message.id == null) {
                message.id = messageIdx++;
            }

            this.messages = [...this.messages, message];
        },
        remove(message) {
            let index = -1;
            for (let i = 0; i < this.messages.length; i++) {
                if (this.messages[i] === message) {
                    index = i;
                    break;
                }
            }

            this.messages.splice(index, 1);
        },
        onAdd(message) {
            if (this.group == message.group) {
                this.add(message);
            }
        },
        onRemoveGroup(group) {
            if (this.group === group) {
                this.messages = [];
            }
        },
        onRemoveAllGroups() {
            this.messages = [];
        }
    },
    components: {
        'ToastMessage': script$1
    },
    computed: {
        containerClass() {
            return ['p-toast p-component p-toast-' + this.position, {
                'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        }
    }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ToastMessage = vue.resolveComponent("ToastMessage");

  return (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
    vue.createVNode("div", vue.mergeProps({
      ref: "container",
      class: $options.containerClass
    }, _ctx.$attrs), [
      vue.createVNode(vue.TransitionGroup, {
        name: "p-toast-message",
        tag: "div"
      }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($data.messages, (msg) => {
            return (vue.openBlock(), vue.createBlock(_component_ToastMessage, {
              key: msg.id,
              message: msg,
              onClose: _cache[1] || (_cache[1] = $event => ($options.remove($event)))
            }, null, 8, ["message"]))
          }), 128))
        ]),
        _: 1
      })
    ], 16)
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

var css_248z = "\n.p-toast {\r\n    position: fixed;\r\n    width: 25rem;\n}\n.p-toast-message-content {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\n}\n.p-toast-message-text {\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1 1 auto;\r\n            flex: 1 1 auto;\n}\n.p-toast-top-right {\r\n\ttop: 20px;\r\n\tright: 20px;\n}\n.p-toast-top-left {\r\n\ttop: 20px;\r\n\tleft: 20px;\n}\n.p-toast-bottom-left {\r\n\tbottom: 20px;\r\n\tleft: 20px;\n}\n.p-toast-bottom-right {\r\n\tbottom: 20px;\r\n\tright: 20px;\n}\n.p-toast-top-center {\r\n\ttop: 20px;\r\n    left: 50%;\r\n    margin-left: -10em;\n}\n.p-toast-bottom-center {\r\n\tbottom: 20px;\r\n\tleft: 50%;\r\n    margin-left: -10em;\n}\n.p-toast-center {\r\n\tleft: 50%;\r\n\ttop: 50%;\r\n    min-width: 20vw;\r\n    -webkit-transform: translate(-50%, -50%);\r\n            transform: translate(-50%, -50%);\n}\n.p-toast-icon-close {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    overflow: hidden;\r\n    position: relative;\n}\n.p-toast-icon-close.p-link {\r\n\tcursor: pointer;\n}\r\n\r\n/* Animations */\n.p-toast-message-enter-from {\r\n    opacity: 0;\r\n    -webkit-transform: translateY(50%);\r\n    transform: translateY(50%);\n}\n.p-toast-message-leave-from {\r\n    max-height: 1000px;\n}\n.p-toast .p-toast-message.p-toast-message-leave-to {\r\n    max-height: 0;\r\n    opacity: 0;\r\n    margin-bottom: 0;\r\n    overflow: hidden;\n}\n.p-toast-message-enter-active {\r\n    -webkit-transition: transform .3s, opacity .3s;\r\n    -webkit-transition: opacity .3s, -webkit-transform .3s;\r\n    transition: opacity .3s, -webkit-transform .3s;\r\n    transition: transform .3s, opacity .3s;\r\n    transition: transform .3s, opacity .3s, -webkit-transform .3s;\n}\n.p-toast-message-leave-active {\r\n    -webkit-transition: max-height .45s cubic-bezier(0, 1, 0, 1), opacity .3s, margin-bottom .3s;\r\n    transition: max-height .45s cubic-bezier(0, 1, 0, 1), opacity .3s, margin-bottom .3s;\n}\r\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
