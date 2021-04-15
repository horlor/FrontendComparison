<script lang="ts">
	let before = Date.now()
	let pi = 0;
	let i=0
	for(i=0; i<1000000;i++)
		pi+=Math.pow(-1,i)/(2*i+1);
	pi=4*pi;
	let after = Date.now()
</script>
<p>Pi is {pi}</p>
<p>Interval: {after-before}</p>