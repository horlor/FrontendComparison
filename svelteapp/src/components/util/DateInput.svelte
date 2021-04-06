<script lang="ts">
export let value: string;
export let id: string = undefined;
export let className: string ="";
import dayjs from "dayjs"

let format="YYYY-MM-DD"
let internal


const input = (x) => (internal = dayjs(x).format(format))
const output = (x) => {
	if(x)
		value = dayjs(x, format).toJSON()
	else 
		value = null
}

$: input(value)
$: output(internal)
</script>
<input class=" p-1 border rounded-sm border-gray-300" {id} type="date" bind:value={internal}>