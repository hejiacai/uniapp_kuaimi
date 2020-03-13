<template>
	<view v-if="showPopup" :class="['uni-popup', masterbgClassName ? masterbgClassName: ''] ">
		<view class="uni-popup__mask" :class="[ani+'-mask', animation ? 'mask-ani' : '']" @tap="closePop"/>
		<view class="uni-popup__wrapper" :class="[type,ani+'-content', animation ? 'content-ani' : '']">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopup',
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
			type: {
				type: String,
				default: 'center'
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			show: {
				type: Boolean,
				default: true
			},
			masterbgClassName: {//是否需要遮盖透明底部内容,默
				type: String,
				default: ''
			}
		},
		data() {
			return {
				ani: '',
				showPopup: false
			}
		},
		watch: {
			show(newValue) {
				if (newValue) {
					this.open()
				} else {
					this.close()
				}
			}
		},
		created() {
			// this.open()
		},
		methods: {
			closePop(){
				// this.close()
				console.log('关闭了它')
			},
			clear() {},
			open() {
				this.$emit('change', {
					show: true
				})
				this.showPopup = true
				this.$nextTick(() => {
					setTimeout(() => {
						this.ani = 'uni-' + this.type
					}, 100)
				})
			},
			close(type) {
				if (!this.maskClick && type) return
				this.$emit('change', {
					show: false
				})
				this.ani = ''
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPopup = false
					}, 300)
				})
			}
		}
	}
</script>
<style scoped>
	.uni-popup {
		position: fixed;
		top:var(--status-bar-height);
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		z-index: 999;
		touch-action: none;
	}
    /* #ifdef MP-WEIXIN */
        .uni-popup {
        	position: fixed;
        	top:var(--status-bar-height);
        	left: 0;
			height: 100vh;
			width: 100%;
        	overflow: hidden;
        	z-index: 999;
			box-sizing: border-box;
			touch-action: none;
        }
		.popupWhiteBg{
			background: #FFFFFF;
		}
    /* #endif */
	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		top: 0;
		left: 0;
		right: 0;
		transform: translateY(-500px);
	}

	.bottom {
		bottom: 0;
		left: 0;
		right: 0;
		transform: translateY(500px);
	}

	.center {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		justify-content: center;
		align-items: center;
		transform: scale(1.2);
		opacity: 0;
	}

	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		width: 100%;
	}

	.content-ani {
		/* transition: transform 0.3s;
 */
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>