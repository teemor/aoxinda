import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        type: 'ancestor',
        name: 'badge-group',
        linked(target) {
            this.parent = target;
        }
    },
    props: {
        info: null,
        title: String,
        titlea:Number
    },
    methods: {
        onClick() {
            const { parent } = this;
            if (!parent) {
                return;
            }
            const index = parent.badges.indexOf(this);
            // console.log(parent.badges[index].data,'index')
            
            parent.setActive(index).then(() => {
                this.$emit('click', index);
                parent.$emit('change', parent.badges[index].data);
            });
        },
        setActive(active) {
            return this.set({ active });
        }
    }
});
