<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">

      <div class="col">
        <q-input
        class="new-qweet"
        bottom-slots
        v-model="newQweetContent"
        placeholder="What's happening?"
        counter
        maxlength="280"
        autofocus
        autogrow
        >
        <template v-slot:before>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </template>
      
        
      </q-input>
      </div>
      <div class="col col-shrink">
         <q-btn
         class="q-mb-lg"
            unelevated
            rounded
            color="primary"
            label="Qweet"
            no-caps
            :disable="!newQweetContent" />
      </div>

    </div>
    <q-separator
      size="10px"
      color="grey-2"
      class="divider" />

     <q-list>
      <q-item class="q-py-md">
        <q-item-section avatar top>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar5.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Danny Connel</strong>
            <span class="text-grey-7"> @danny__connell</span>
          </q-item-label>
          <q-item-label class="qweet-content text-body1" >
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione numquam quisquam in tempore atque cum, 
           
           facere explicabo quis, modi nihil recusandae, architecto reiciendis consectetur quibusdam distinctio reprehenderit laudantium nisi molestias?
          </q-item-label>
          <div class="qweet-icons row justify-between q-mt-sm">
            <q-btn
              flat
              round
              color="grey"
              icon="far fa-comment"
              size="sm" />
            <q-btn
              flat
              round
              color="grey"
              icon="fas fa-retweet"
              size="sm" />
            <q-btn
              flat
              round
              color="grey"
              icon="far fa-heart"
              size="sm" />
            <q-btn
              flat
              round
              color="grey"
              icon="fas fa-trash"
              size="sm" />
          </div>
        </q-item-section>

        <q-item-section side top>
          1 min ago
        </q-item-section>
      </q-item>

      
    </q-list>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageHome',
  data(){
    return {
      newQweetContent:''
    }
  }
})
</script>
<style lang="sass">
  .new-qweet
    textarea
      font-size: 19px
      line-height: 1.4 !important
  .divider
    border-top: 1px solid
    border-bottom: 1px solid
    border-color: grey-2
  .qweet-content
    white-space:pre-line
  .qweet-icons
    margin-left: -5px
</style>
