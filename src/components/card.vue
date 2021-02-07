<template>
    <div class="card">
        <div class="card__title">{{ data.title }}</div>
        <div class="card__content">
            <div
                class="card__item"
                v-for="(item, index) in data.values"
                :key="index"
            >
                <template v-if="typeof item === 'object'">
                    <span class="card__item-name">{{ item.name }}</span>
                    <span class="card__item-value" v-if="!item.value.includes('http')">{{ item.value }}</span>
                    <a class="card__item-value" :href="item.value" v-else>{{ item.value }}</a>
                </template>
                <template v-else>
                    {{ item }}
                </template>
            </div>
        </div>
    </div>
</template>

<script>
	import {defineComponent, computed} from 'vue';

	export default defineComponent({
		props: ['data'],
		setup(props) {
			const data = computed(() => props.data);

			return {
				data
			}
		}
	})
</script>

<style lang="scss" scoped>
    .card {
        padding: 12px 18px;
        border-radius: 9px;
        color: #050017;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 9px;

        .card__title {
            font-size: 20px;
            font-weight: bolder;
            border-bottom: solid 2px rgba(229, 232, 236, 0.604);
            padding: 0px 0px 8px;
        }

        .card__content {
            font-size: 16px;
            padding: 8px 0px 0px;

            .card__item {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                font-size: 16px;

                &:not(:first-child) {
                    margin-top: 10px;
                }

                .card__item-name {
                    text-align: left;
                    color: #5c5c5c;
                    width: 100%;
                }

                .card__item-value {
                    color: #050017;
                }
            }
        }
    }
</style>
