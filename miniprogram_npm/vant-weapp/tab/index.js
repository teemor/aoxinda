import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'tabs',
        type: 'ancestor'
    },
    props: {
        dot: Boolean,
        info: null,
        titlea:Number,
        title: String,
        disabled: Boolean,
        titleStyle: String
    },
    data: {
        width: null,
        inited: false,
        active: false,
        animated: false
    },
    watch: {
        titlea:'update',
        title: 'update',
        disabled: 'update',
        dot: 'update',
        info: 'update',
        titleStyle: 'update'
    },
    methods: {
        update() {
            const parent = this.getRelationNodes('../tabs/index')[0];
            console.log(parent,'parent')
            if (parent) {
                parent.updateTabs();
            }
        }
    }
});
