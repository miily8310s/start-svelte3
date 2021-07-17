<script lang="ts">
	import { onDestroy } from "svelte";
	import { createLifeGame } from "./lifegame";
	const ROW_SIZE = 20
	const COLUMN_SIZE = 20

	const lifegame = createLifeGame(ROW_SIZE, COLUMN_SIZE)

	let isRunning = false
	let tickInterval

	const startTimer = () => {
		tickInterval = setInterval(() => {
			lifegame.moveNextTick()
		}, 30)
	}

	const stopTimer = () => {
		clearInterval(tickInterval)
		tickInterval = undefined
	}

	$: if(isRunning && !tickInterval) {
		startTimer()
	}

	$: if (!isRunning && tickInterval) {
		stopTimer()
	}

	onDestroy(() => {
		if (tickInterval) {
			stopTimer()
		}
	})
</script>

<div class="lifegame-container">
	<div class="lifegame-cells-container">
		<div class="lifegame-cells">
			{#each $lifegame.grid as row, i}
				{#each row as col, j}
					<div
					  class="cell"
						class:alive={col.isAlive}
						style="grid-row: {i + 1}"
						on:click={(e) => lifegame.toggle(i, j)} />
				{/each}
			{/each}
		</div>
	</div>
	<div class="lifegame-controller-container">
		{#if !isRunning}
		  <button on:click={(e) => isRunning = true}>タイマーを動かす</button>
		  <button on:click={(e) => lifegame.moveNextTick()}>1ターン進める</button>
		{:else}
		  <button on:click={(e) => isRunning = false}>タイマーを止める</button>
		{/if}
	</div>
</div>

<style>
	.lifegame-container {
		display: block;
		width: max-content;
	}

	.lifegame-cells-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lifegame-cells {
		display: grid;
		background-color: #333;
		gap: 1px 1px;
		border: solid 1px #333;
	}

	.cell {
		width: 20px;
		height: 20px;
		background-color: #eee;
	}
	.cell.alive {
		background-color: red;
	}
</style>