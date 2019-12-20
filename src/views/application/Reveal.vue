<template>
	<div id="reveal">
		<div class="reveal">
			<div class="slides">
					<section v-for="post in this.posts"
									:key= post.id>
					<h4>{{post.title}}</h4>
					<p v-html=post.content></p>
					</section>
			</div>
		</div>
	</div>
</template>


<script>
import Reveal from 'reveal.js/js/reveal'

export default {
  name: 'reveal',
  components: {
		
	},
	data: function() {
		return {
			posts : '',
			passedResource : this.$attrs.resource
		}
	},
	created() {
		window.console.log('created')
		var dataparsed = JSON.parse(localStorage.getItem(this.passedResource))
		this.posts = dataparsed.data
	},
  mounted() {
		window.console.log('mounted')
		
		Reveal.initialize({
			center: false,
			width: "100%",
			height: "100%",
			margin: 0.1,
			minScale: 0.8,
			maxScale: 1.5
		})
		Reveal.slide(-1, -1, -1)
		Reveal.sync()
		
		function resetSlideScrolling(slide) {
			slide.classList.remove("scrollable-slide");
		}
		function handleSlideScrolling(slide) {
			if (slide.scrollHeight >= 800) {
				slide.classList.add("scrollable-slide");
			}
		}
		Reveal.addEventListener("ready", function(event) {
			handleSlideScrolling(event.currentSlide);
		})
		Reveal.addEventListener("slidechanged", function(event) {
			window.console.log('slidechanged')
			handleSlideScrolling(event.currentSlide);
			if (event.previousSlide) {
				setTimeout(function() {
					resetSlideScrolling(event.previousSlide);
				}, 200)
			}
		});
	},
	updated() {
		window.console.log('updated')
	}
}
</script>

<style>

#reveal {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	height: 100vh;
	width: 100vw;
}

.scrollable-slide {
  height: 100%;
  overflow-y: auto !important;
}
@media (max-width: 1024px) {
  .slides section{
    padding: 0px !important;
    font-size: 2rem;
  }
  .reveal .controls{
    bottom: 75px !important;
    right: 15px !important;
  }
}

</style>