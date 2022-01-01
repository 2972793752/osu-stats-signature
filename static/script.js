const i18n = {
	en: {
		'生成 osu! 签名档卡片': 'Generate osu! signature card',
		'用户名 / UID': 'Username / UID',
		'背景模糊': 'Background blur',
		'模糊强度': 'Blur size',
		'圆头像': 'Round avatar',
		'动画': 'Animation',
		'颜色': 'Color',
		'粉色': 'Pink',
		'紫色': 'Purple',
		'蓝色': 'Blue',
		'绿色': 'Green',
		'酸橙': 'Lime',
		'橙色': 'Orange',
		'深橙': 'Dark orange',
		'红色': 'Red',
		'尺寸': 'Size',
		'完整': 'Full',
		'迷你': 'Mini',
		'生成': 'Generate',
	}
}
const app = {
	data() {
		return {
			username: "",
			playmode: "std",
			language: navigator.language.includes("zh") ? "cn" : "en",
			cardmode: "full",
			blur_checked: false,
			blur_size: 6,
			round_avatar: false,
			animation: true,
			color_hue: 333,
			size: {
				w: 550,
				h: 320
			},
			size_mini: {
				w: 400,
				h: 120
			},
		}
	},
	watch: {
		color_hue(val) {
			document.body.style.setProperty('--base-hue', val);
		},
	},
	methods: {
		clamp(val, min, max) {
			return Math.min(Math.max(val, min), max);
		},
		generate() {
			let url = `/card?user=${encodeURI(this.username.trim())}&mode=${this.playmode}`;
			if (this.language != "cn") {
				url += `&lang=${this.language}`;
			}
			if (this.blur_checked){
				url += `&blur=${this.blur_size}`;
			}
			if (this.round_avatar){
				url += `&round_avatar=true`;
			}
			if (this.animation){
				url += "&animation=true";
			}
			if (this.color_hue != 333){
				url += "&hue=" + this.color_hue;
			}
			if (this.cardmode == "mini"){
				url += "&mini=true";
				if (this.size_mini.w != 400 || this.size_mini.h != 120){
					url += "&w=" + this.size_mini.w + "&h=" + this.size_mini.h;
				}
			}else{
				if (this.size.w != 550 || this.size.h != 320){
					url += "&w=" + this.size.w + "&h=" + this.size.h;
				}
			}
			document.getElementById("link").setAttribute("href", url);
			document.getElementById("link").click();
		},
		$n(text) {
			if (!i18n.hasOwnProperty(this.language)){
				return text;
			}
			return i18n[this.language][text] || text;
		},
	},
	computed: {
		
	},
}

Vue.createApp(app).mount('#main');