import { openBlock, createBlock, createVNode } from 'vue';

var script = {
    name: 'Chart',
    emits: ['select'],
    props: {
        type: String,
        data: null,
        options: null,
        width: {
            type: Number,
            default: 300
        },
        height: {
            type: Number,
            default: 150
        },
    },
    chart: null,
    mounted() {
        this.initChart();
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }
    },
    watch: {
        data() {
            this.reinit();
        },
        type() {
            this.reinit();
        },
        options() {
            this.reinit();
        }
    },
    methods: {
        initChart() {
            import('chart.js').then((module) => {
                if (module && module.default) {
                    this.chart = new module.default(this.$refs.canvas, {
                        type: this.type,
                        data: this.data,
                        options: this.options
                    });
                }
            });
        },
        getCanvas() {
            return this.$canvas;
        },
        getBase64Image() {
            return this.chart.toBase64Image();
        },
        refresh() {
            if (this.chart) {
                this.chart.update();
            }
        },
        reinit() {
            if (this.chart) {
                this.chart.destroy();
                this.initChart();
            }
        },
        onCanvasClick(event) {
            if (this.chart) {
                const element = this.chart.getElementAtEvent(event);
                const dataset = this.chart.getDatasetAtEvent(event);

                if (element && element[0] && dataset) {
                    this.$emit('select', {originalEvent: event, element: element[0], dataset: dataset});
                }
            }
        },
        generateLegend() {
            if (this.chart) {
                return this.chart.generateLegend();
            }
        }
    }
};

const _hoisted_1 = { class: "p-chart" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode("canvas", {
      ref: "canvas",
      width: $props.width,
      height: $props.height,
      onClick: _cache[1] || (_cache[1] = $event => ($options.onCanvasClick($event)))
    }, null, 8, ["width", "height"])
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

var css_248z = "\n.p-chart {\r\n    position: relative;\n}\r\n";
styleInject(css_248z);

script.render = render;

export default script;
