<script lang="ts">
	let show = false
	const copyWebPageInfo = (myFormat: string) => {
		// ツールチップの表示状態
        show = false;
        // スクリプトが参照する変数を宣言してフォーマットを指定するコード
        const prepCode = {
            code: `var formatFromPopup = '${myFormat}';`,
        };
        // ウェブページの情報をクリップボードにコピーするスクリプト
        const mainCode = {
            file: "content_script.js",
        };
        // ウェブページにコードとスクリプトを送り込む
        chrome.tabs.executeScript(null, prepCode, () => {
            chrome.tabs.executeScript(null, mainCode);
            show = true;
            setTimeout(() => {
                show = false;
            }, 3000);
        });
    }
	$: console.log(`show: ${show}`);
</script>

<main>
	<div>
		<span>ウェブページの情報を読み取る</span>
	</div>
	<div class="tooltip">
		<span class="tooltiptext" class:show>クリップボードにコピーしました。</span>
	</div>
	<div class="button-container">
		<button on:click={(e) => copyWebPageInfo('[$title]($url)$lf$selection')}>マークダウン記法</button>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>