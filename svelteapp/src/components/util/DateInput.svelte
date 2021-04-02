<script lang="ts">
export let value: string;
export let id: string = undefined;
import dayjs from "dayjs"

let format="YYYY-MM-DD"
let internal


const input = (x) => (internal = dayjs(x).format(format))
const output = (x) => {
	if(x)
		value = dayjs(x, format).format()
	else 
		value = null
}

$: input(value)
$: output(internal)
</script>
<input {id} type="date" bind:value={internal}>