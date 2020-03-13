<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.$KM.setStorage('token',"");
		},
		onShow:function() {
			let getToken = this.$KM.getStorage('token');
			console.log('getToken->',getToken)
			if(getToken==null){
				uni.navigateTo({
				    url: 'pages/mine/mine'
				});
			}else{
				this.setToken(getToken);
			}   
		},
		computed: {
			
		},
		methods: {
			...mapMutations(['setToken']),
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
    /* @import "./static/commonstyle/iconfont.css"; */
	@import "./static/commonstyle/kuaimi_iconfont.css";
    @import "./static/commonstyle/wangeditor.css";
	@import "./static/commonstyle/base.css";
    @import url("/components/gaoyia-parse/parse.css");
	/* @import "./uni.scss"; */
	/*每个页面公共css */
    .uni-simple-toast__text{
        color:#ccc!important;
    }
    /* .uni-textarea-textarea{
        color:#ccc!important;
    } */
    /* .uni-picker-action-confirm{
        color:#fb5958!important;
    } */
</style>
