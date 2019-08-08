
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


Vue.component('mon-multistep', {
    props: {

    },
    provide: function() {
        return {
            registerStep: (step) => {
                this.steps.push(step);

                // on trie le tableau en se basant sur l'ordre d'apparition dans les fils
                let stepTrie = [];
                let stepSansCorrespondance = [];
                let parentDuDomSupposementCommun = step.getComponent().$el.parentNode;
                let nodeFrereDansOrdreDuDom = Array.from(parentDuDomSupposementCommun.childNodes);
                this.steps.forEach(step => {
                    let index = nodeFrereDansOrdreDuDom.indexOf(step.getComponent().$el);
                    if(index >=0) {
                        stepTrie[index] = step;
                    } else {
                        stepSansCorrespondance.push(step);
                    }
                });
                this.steps = stepTrie.flat().concat(stepSansCorrespondance);
                this.propagateVisibility();
            }
        };
    },
    template: `  <div>
                    <div class="ui ordered top attached steps">
                        <div v-for="(step, index) in steps" class="step" :class="{completed: index < indexActive, active: indexActive === index, disabled: index > indexActive, link: index < indexActive}" @click="goPrevStep(index)">
                            <div class="content">
                                <div class="title">{{step.getTitre()}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="ui attached segment">
                        <slot></slot>
                    </div>
                 </div>`,
    data: function() {
        return {
            steps: []
        }
    },
    methods: {
        completeCurrentStep: function() {
            this.steps[this.indexActive].setCompleted(true);
            this.propagateVisibility();
        },
        propagateVisibility: function() {
            this.steps.forEach((step, index) => {
                step.setVisibility(index === this.indexActive);
            });
        },
        goPrevStep: function(indexToActivate) {
            if(indexToActivate < this.indexActive) {
                this.steps.forEach((step, index) => {
                    if(index >= indexToActivate) {
                        step.setCompleted(false);
                    }
                });
            }
            this.propagateVisibility();
        }
    },
    computed: {
        indexActive: function() {
            let index = this.steps.findIndex(step => !step.getCompleted());
            return index >= 0 ? index : 0;
        }
    }
});

Vue.component('mon-step', {
    props: ['titre'],
    inject: ['registerStep'],
    template: `  <div v-if="isShowed">
                    <slot></slot>
                 </div>`,
    data: function() {
        return {
            isShowed: false,
            completed: false
        }
    },
    mounted: function() {
        this.registerStep({
            getTitre: () => this.titre,
            getVisibility: () => this.isShowed,
            setVisibility: (visibility) => this.isShowed = visibility,
            getCompleted: () => this.completed,
            setCompleted: (completed) => this.completed = completed,
            getComponent: () => this
        });
    }
});

Vue.directive('shake', function(el, binding) {
    let inHandler = () => {
        let elementToShake = binding.value();
        if(elementToShake != null) {
            $(elementToShake).addClass('animated shake');
            if(binding.modifiers.infinite === true) {
                $(elementToShake).addClass('infinite');
            }
        }
    };
    let outHandler = () => {
        let elementToShake = binding.value();
        if(elementToShake != null) {
            $(elementToShake).removeClass('animated infinite shake');
        }
    };

    let jqueryEl = $(el);
    jqueryEl.off('mouseenter', inHandler);
    jqueryEl.on('mouseenter', inHandler);
    jqueryEl.off('mouseleave', outHandler);
    jqueryEl.on('mouseleave', outHandler);
});

new Vue({
    template: '#js-form-simu-pret-tpl',
    el: '#js-form-simu-pret',
    data: {
        prets: [],
        email: null,
        resultat: null,
        error: null
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
            this.error = null;
            let Simulateur = await import('./Simulateur.js');
            try {
                this.resultat = Simulateur.executeSimulation(this.prets);
                this.$refs.multiStep.completeCurrentStep();
            } catch(e) {
                this.error = e;
            }
        },
        getElementToShake: function() {
            if(this.email == null) {
                return this.$refs.email.$el;
            } else {
                return null;
            }
        }
    }
});
