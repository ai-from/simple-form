<template>
  <div class="field notification">
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.47288 9.68401C4.08236 9.29348 4.08236 8.66032 4.47288 8.2698L12.2929 0.449632C12.6835 0.0591074 13.3166 0.059107 13.7072 0.449631C14.0977 0.840156 14.0977 1.47332 13.7072 1.86384L5.8871 9.68401C5.49657 10.0745 4.86341 10.0745 4.47288 9.68401Z" fill="#12C971"/>
      <path d="M5.8871 9.68401C6.27762 9.29348 6.27756 8.66032 5.88704 8.2698L1.70711 4.08989C1.31658 3.69937 0.683417 3.69937 0.292893 4.08989C-0.097631 4.48042 -0.0976311 5.11358 0.292893 5.50411L4.47288 9.68401C4.86341 10.0745 5.49657 10.0745 5.8871 9.68401Z" fill="#12C971"/>
    </svg>
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data: () => ({
    msg: 'Данные успешно сохранены'
  })
}
</script>

<style lang="sass" scoped>
.field
  display: grid
  grid-template-columns: repeat(2, min-content)
  grid-column-gap: 12px
  align-items: center
  width: min-content
  padding: 22px 35px 22px 27px
  background: $notificationBg
  border-radius: 6px
  box-shadow: rgba(0, 15, 38, .25) 0 4px 16px
  span
    font-family: $FiraSans
    font-size: 0.81rem
    color: $black
    white-space: nowrap
</style>