<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
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

:global(body.light) {
  color: #000;
  background: #fff;
}
:global(body.dark) {
  color: #eee;
  background: #111;
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

.tower-cell {
  font-size: 2rem;
}
.toggleButton {
  padding: .5rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  transition: .2s;
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
  <meta name="theme-color" content="#000000">
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
  <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/icons/favicon.ico">
  <meta name="msapplication-TileColor" content="#2d89ef">
  <meta name="msapplication-config" content="/icons/browserconfig.xml">
</svelte:head>

<main class="main flex min-h-screen flex-col items-center justify-center p-4">
    <div>
      <h1 class="timeStr">
        <time datetime={dateStr} class="timeEl flex flex-col">
          <span class="dateString">{dateStr1}</span>
          <div class="flex items-baseline">
            <span>{timeStr}</span>
            <span class='ms'>{msStr}</span>
            <span id="tower-cell" class='tower-cell ml-2'><Fa icon={faTowerCell} /></span>
          </div>
        </time>
      </h1>
      <div class="info-div flex gap-2 flex-row justify-between w-full">
        <div class="gap-2 flex items-center">
          <button on:click={() => advancedShown = !advancedShown} class="toggleButton">
            {#if advancedShown}
              <div in:fade={{ delay: 0, duration: 200 }}>
                <Fa icon={faAngleUp} />
              </div>
            {:else}
              <div in:fade={{ delay: 0, duration: 200 }}>
                <Fa icon={faAngleDown} />
              </div>
            {/if}
          </button>
          <Switch design="slider" bind:value={switchValue} label="🌙" />
          <span id="timezone" class="timezone">Timezone: {timezone}</span>
        </div>
        <span>UTC: <time id="utc" datetime={utcDateStr}>{utcDateStr1} {utcTimeStr}</time> </span>
      </div>
      {#if advancedShown}
        <div in:fade={{ delay: 0, duration: 200 }} class="flex flex-col gap-2 mt-4">
          <span>Unix: <time id="unix" datetime={date.toTimeString()}>{date.getTime()}</time> </span>
          <span>IP: {$page.data.ip}</span>
          <span>General Location: {$page.data.city}, {$page.data.region}, {$page.data.country}</span>
        </div>
      {/if}
    </div>
</main>


<script lang="ts">
  import Fa from '../../node_modules/svelte-fa/dist/fa.svelte';
  import { fade } from 'svelte/transition';
  import { faTowerCell, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons/index.js';
  import Switch from './Switch.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  let switchValue = true;
  let advancedShown = false;
  let date = new Date();

  // console.log($page.data.ip)

  onMount(() => {
    setInterval(() => {
      date = new Date();
      document.title = `${timeStr} | The Time`;
      if (switchValue) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      }
      else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
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
      let currentTime = (new Date()).getTime();
      const response = await fetch('https://worldtimeapi.org/api/timezone/' + timezone);
      const data = await response.json();
      // console.log(data);
      // console.log(lastTime);
      // console.log(Date.parse(data.datetime));
      let unixtime = data.unixtime * 1000;
      let diff = (new Date()).getTime() - (((new Date()).getTime() - currentTime));
      // console.log(lastTime);
      return diff;
    }
    catch (e) {
      console.error(e);
      return NaN;
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
    let date = new Date((new Date()).getTime() + response);
    return date.getTime();
  }
</script>