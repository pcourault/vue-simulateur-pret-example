
Vue.component('mon-input', {
    props: {
        value: { },
        placeholder: {
            type: String,
            default: 'valeur'
        },
        rightLabel: {
            type: String
        },
        mask: {
            type: String,
            required: true
        }
    },
    template: `  <div class="ui input" :class="{right: rightLabel, labeled: rightLabel}">
                    <input type="text" :placeholder="placeholder" ref="inputField">
                    <div v-if="rightLabel" class="ui basic label">{{rightLabel}}</div>
                 </div>`,
    data: function() {
        return { }
    },
    methods: {
        handleChange: function() {
            let inputField = $(this.$refs.inputField);
            if(inputField.inputmask("isComplete")) {
                this.$emit('input', $(this.$refs.inputField).inputmask("unmaskedvalue"));
            } else if(this.value != null) {
                this.$emit('input', null);
            }
        }
    },
    watch: {
        mask: {
            handler: async function(newMask) {
                await this.$nextTick();
                let option = {
                                email: {
                                    alias: 'email'
                                },
                                decimal: {
                                    alias: 'numeric',
                                    groupSeparator: ' '
                                },
                                entier: {
                                    alias: 'decimal',
                                    digits: 0,
                                    groupSeparator: ' '
                                }
                            }[newMask];
                $(this.$refs.inputField)
                    .inputmask(option)
                    .on('input', this.handleChange);
            },
            immediate: true
        }
    }
});

new Vue({
    template: '#js-form-simu-pret-tpl',
    el: '#js-form-simu-pret',
    data: {
        prets: [],
        email: null,
        resultat: null
    },
    mounted: function() {
        this.addPret();
    },
    methods: {
        addPret: function() {
            this.prets.push({
                dureeAnnee: null,
                tauxPret: null,
                montant: null
            });
        },
        simulate: async function() {
            let Simulateur = await import('./Simulateur.js');
            this.resultat = Simulateur.executeSimulation(this.prets);
        }
    }
});
