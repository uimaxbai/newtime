<style lang="scss">
@font-face {
  font-family:'JetBrains Mono';
  src: url(/fonts/JetBrainsMono-Bold.woff2);
  font-weight: bold;
}
@font-face {
  font-family:'JetBrains Mono';
  src: url(/fonts/JetBrainsMono-Regular.woff2);
  font-weight: normal;
}

* {
  user-select: none;
}

.timeStr {
  font-weight: bold;
  font-size: 5em;
}

.timezone {
  text-align: left;
  position: relative;
  left: 0;
}

.dateString {
  font-size: 1.5rem;
}

h1 time span {
  width: 100%;
  font-size: 14vw;
}

time div {
  font-size: 14vw;
}


:global(body) {
  color: #000;
  background: #fff;
  font-family: 'JetBrains Mono', monospace;
}

:global(.light) {
  color: #000!important;
  background: #fff!important;
}
:global(.dark) {
  color: #eee!important;
  background: #111!important;
}



.ms {
  font-size: 6vw;
}

/* .mode-button {
  border-radius: .25rem;
} */

/* .moon-button {
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  text-shadow: var(--shadow-md);
} */

:global(body) {
  --transition-d: 0.5s;
  -webkit-transition: var(--transition-d) ease;
  -moz-transition: var(--transition-d) ease;
  -o-transition: var(--transition-d) ease;
  transition: var(--transition-d) ease;
}

/* .react-toggle-track div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .8rem;
} */

@media (max-width: 800px) {

  .info-div,
  .info-div div {
    flex-direction: column;
  }

  .info-div div {
    align-items: baseline;
  }

  .tower-cell {
    font-size: 5vw;
  }
}
@media (max-width: 550px) {
  .info-div {
    margin-top: 0!important;
  }
}

.tower-cell {
  font-size: 2rem;
}
.toggleButton {
  padding: .5rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  transition: .2s;
}
.info-div {
  margin-top: -1em;
}
.theme-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  border: 1px solid gray;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.25rem;
  flex-direction: row!important;
  button {
    padding: .5rem;
  }
  .light, .dark {
    border-right: 1px solid gray;
  }
  .seperator {
    margin-left: -40px;
    padding: 0;
    position: absolute;
  }
  .seperator:nth-child(2) {
    margin-left: 40px;
  }
  .light {
    background: #fff;
    color: black;
    border-radius: 5px 0 0 5px;
  }
  .dark {
    background: #111;
    color: #eee;
    border-radius: 0;
  }
  .custom {
    background-image: linear-gradient(315deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000);
    border-radius: 0 5px 5px 0;
    color: #000;
  }
}
:global(.color) {
  border: 1px solid #999;
}
</style>

<svelte:head>
  <title>The Time</title>
  <meta name="description" content="A simple website that shows the time. Night mode included as default.">
  <meta name="keywords" content="time, thetime, current time">
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta name="og:title" content="The Time" />
  <meta name="og:description" content="A simple website that shows the time. Night mode included as default." />
  <meta name="og:url" content="https://time.okit.works" />
  <meta name="og:site_name" content="The Time" />
  <meta name="og:locale" content="en_GB" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="The Time" />
  <meta name="twitter:description" content="A simple website that shows the time. Night mode included as default." />
  <meta name="twitter:creator" content="@uimaxbai" />
  <meta name="robots" content="index, follow, max-snippet: -1, max-image-preview:large, max-video-preview: -1">
  <meta name="theme-color" content="#111111">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
  <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/icons/favicon.ico">
  <meta name="msapplication-TileColor" content="#2d89ef">
  <meta name="msapplication-config" content="/icons/browserconfig.xml">
</svelte:head>


<main class="main transition flex min-h-screen flex-col items-center justify-center p-4" class:dark={theme === 1} class:light={theme === 0} style="background: {hex}; color: rgba({rgb.r}, {rgb.b}, {rgb.g}, {rgb.a});">
    <div>
      <h1 class="timeStr">
        <time datetime={dateStr} class="timeEl flex flex-col">
          <span class="dateString">{dateStr1}</span>
          <div class="flex items-baseline">
            <button aria-label="Show options" on:click={() => advancedShown = !advancedShown} class="toggleButton">
              {#if advancedShown}
                <div in:fade={{ delay: 0, duration: 200 }}>
                  <Fa icon={faAngleUp} style="font-size: initial;" />
                </div>
              {:else}
                <div in:fade={{ delay: 0, duration: 200 }}>
                  <Fa icon={faAngleDown} style="font-size: initial;" />
                </div>
              {/if}
            </button>
            <span>{timeStr}</span>
            <span class='ms'>{msStr}</span>
            <span id="tower-cell" class='tower-cell ml-2'><Fa icon={faTowerCell} /></span>
          </div>
        </time>
      </h1>
      <div class="info-div flex gap-2 flex-row justify-between w-full">
        <div class="gap-2 flex items-center">
          {#if advancedShown}
            <div class="theme-selector">
              <button aria-label="Change to light mode" class="light" on:click={() => theme = 0}>{h}</button>
              <span class="seperator">:</span>
              <button aria-label="Change to dark mode" class="dark" on:click={() => theme = 1}>{m}</button>
              <span class="seperator">:</span>
              <button aria-label="Define a custom theme" class="custom" on:click={() => theme = 2}>{s}</button>
            </div>
            {#if theme === 2}
            <ColorPicker
              bind:hex
              label=""
            />
            <ColorPicker
              bind:rgb
              label=""
            />
            {/if}
            <span id="timezone" transition:fade={{ delay: 0, duration: 200 }} class="timezone">Timezone: {timezone}</span>
          {/if}
        </div>
        {#if advancedShown}
          <span transition:fade={{ delay: 0, duration: 200 }}>UTC: <time id="utc" datetime={utcDateStr}>{utcDateStr1} {utcTimeStr}</time></span>
        {/if}
      </div>
      {#if advancedShown}
        <div transition:fade={{ delay: 0, duration: 200 }} class="flex flex-col gap-2 mt-4">
          <span>Unix: <time id="unix" datetime={date.toTimeString()}>{date.getTime()}</time> </span>
          <span>IP: {$page.data.ip}</span>
          <span>General Location: {$page.data.city}, {$page.data.region}, {$page.data.country}</span>
        </div>
      {/if}
    </div>
</main>


<script lang="ts">
  let hex: string = "#000000ff";
  let rgb = {
    "r": 255,
    "g": 255,
    "b": 255,
    "a": 1,
  }
  import Fa from '../../node_modules/svelte-fa/dist/fa.svelte';
  import { fade } from 'svelte/transition';
  import { faTowerCell, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons/index.js';
  import Switch from './Switch.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
  let theme = 1;
  /* onMount(() => {
    if (theme === 2) {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
      document.body.style.background = hex;
      document.body.style.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
      document.querySelector<HTMLElement>(".custom")!.style.background = hex;
      document.querySelector<HTMLElement>(".custom")!.style.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
    }
  }); */
  let advancedShown = false;
  var date = new Date();
  let diff: number = 0;

  onMount(() => {
    /* document.querySelector("button[role='switch']")!.addEventListener("click", () => {
      localStorage.setItem("theme", switchValue.toString());
    });
    setInterval(() => {
      localStorage.setItem("theme", switchValue.toString());
    }, 1000); */
    /* setInterval(() => {
      console.log(hex, rgb);
    }, 1000); */

    if (localStorage.getItem("theme") === "0") {
      theme = 0;
    }
    else if (localStorage.getItem("theme") === "1") {
      theme = 1;
    }
    else if (localStorage.getItem("theme") === "2") {
      theme = 2;
    }
    else if (localStorage.getItem("theme") !== "0" && localStorage.getItem("theme") !== "1" && localStorage.getItem("theme") !== "2"){
      theme = 1;
      localStorage.setItem("theme", theme.toString());
    }
    else {
      theme = 0;
    }
    if (localStorage.getItem("bg") !== null && localStorage.getItem("rgb") !== null) {
      hex = localStorage.getItem("bg")!;
      rgb = JSON.parse(localStorage.getItem("rgb")!);
    }
  });

  // console.log($page.data.ip)

  onMount(() => {
    setInterval(() => {
      date = new Date((new Date()).getTime() + diff);
      document.title = `${timeStr} (${$page.data.city}, ${$page.data.country}) | The Time`;
      localStorage.setItem("theme", theme.toString());
      if (theme === 2) {
        localStorage.setItem("bg", hex);
        localStorage.setItem("rgb", JSON.stringify(rgb));
      }
    }, 10);
    setInterval(() => {
      actuallyGetTime().then((time) => {
        date = new Date(time);
      });
    }, 1000);
  });

  $: ms = ('0' + Math.floor(date.getMilliseconds() / 10)).slice(-2);
  $: s = ('0' + date.getSeconds()).slice(-2);
  $: m = ('0' + date.getMinutes()).slice(-2);
  $: h = ('0' + date.getHours()).slice(-2);
  $: d = ('0' + date.getDate()).slice(-2);
  $: dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" + h + ":" + m + ":" + s + "." + ms;
  $: dateStr1 = d + "/" + ('0' + (date.getMonth() + 1).toString()).slice(-2) + "/" + date.getFullYear();
  $: timeStr = h + ":" + m + ":" + s;
  $: msStr = "." + ms;
  $: utcDateStr = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate() + "T" + ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + ":" + ('0' + date.getUTCSeconds()).slice(-2) + "." + ('0' + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
  $: utcTimeStr = ('0' + date.getUTCHours()).slice(-2) + ":" + ('0' + date.getUTCMinutes()).slice(-2) + ":" + ('0' + date.getUTCSeconds()).slice(-2) + "." + ('0' + Math.floor(date.getUTCMilliseconds() / 10)).slice(-2);
  $: utcDateStr1 = ('0' + date.getUTCDate()).slice(-2) + "/" + ('0' + (date.getUTCMonth() + 1).toString()).slice(-2) + "/" + date.getUTCFullYear();
  let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var offset = date.getTimezoneOffset(), o = Math.abs(offset);
  var offsetStr = (offset > 0 ? "-" : "+") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
  timezone += ` (${offsetStr})`;

  async function getTime(timezone: string) {
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      const data = await response.json();
      const serverTime = new Date(Date.parse(data.datetime));
      const localTime = new Date();
      diff = serverTime.getTime() - localTime.getTime();
      return diff;
    }
    catch (e) {
      console.error(e);
      return diff;
    }
  }

  async function actuallyGetTime() {
    let timezoneRaw = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let response = await getTime(timezoneRaw);
    if (Number.isNaN(response)) {
      document.getElementById("tower-cell")!.style.opacity = "0.5";
    }
    else {
      document.getElementById("tower-cell")!.style.opacity = "1";
    }
    let date1 = new Date((new Date()).getTime() + response);
    return date1.getTime();
  }

  
</script>