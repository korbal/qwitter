<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
            :disable="!newQweetContent"
            @click="addNewQweet" />
        </div>

      </div>
      <q-separator
        size="10px"
        color="grey-2"
        class="divider" />

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
  >
          <q-item
            v-for="qweet in qweets"
            :key="qweet.id"
            class="qweet q-py-md">
            <q-item-section avatar top>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Danny Connel</strong>
                <span class="text-grey-7"> @danny__connell 
                <br class="lt-md"> &bull;  {{ qweet.date }}
                </span>
              </q-item-label>
              <q-item-label class="qweet-content text-body1" >
              {{qweet.content}}
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
                @click="toggleLiked(qweet)"
                  flat
                  round
                  :color="qweet.liked ? 'pink' : 'grey'"
                  :icon="qweet.liked ? 'fas fa-heart' : 'far fa-heart' "
                  size="sm" />
                <q-btn
                  flat
                  round
                  color="grey"
                  icon="fas fa-trash"
                  size="sm"
                  @click="deleteQweet(qweet)"/>
              </div>
            </q-item-section>

            
          </q-item>
        </transition-group>     
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
//import db from 'src/boot/firebase.js'
//import { collection, query, where, onSnapshot, db } from "firebase/firestore";
import { collection, query, where, onSnapshot, getDocs, orderBy, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "src/boot/firebase.js"
import { formatDistance } from 'date-fns'

export default defineComponent({
  name: 'PageHome',
  data(){
    return {
      newQweetContent:'',
      qweets: [
        // {
        //   id: 'ID1',
        //   content: 'Bacon ipsum dolor amet tongue chicken rump, capicola tri-tip bacon meatloaf pork belly ham buffalo ham hock andouille chislic meatball pork loin. Short ribs strip steak tongue pastrami pork bacon kielbasa sirloin buffalo fatback. Pastrami buffalo cow porchetta ball tip picanha tongue meatball ribeye beef ribs. Leberkas short loin short ribs sausage drumstick pork chop.',
        //   date: 1647685901,
        //   liked: false
          
        // },
        // {
        //   id: 'ID2',
        //   content: 'Bacon ipsum dolor amet turducken hamburger short ribs ground round strip steak short loin beef, fatback tenderloin shank landjaeger capicola biltong bacon spare ribs.',
        //   date: 1647685931,
        //   liked: true
        // }
      ]
    }
  },
  methods: {
    addNewQweet(){
      let newQweet = {
        content: this.newQweetContent,
        date: Date.now(),
        liked: false
      }
      //this.qweets.unshift(newQweet)
      
      // Add a new document with a generated id.
      const docRef = addDoc(collection(db, "qweets"), newQweet);
      console.log("Document written with ID: ", newQweet.content);

      this.newQweetContent = ''
    },
    deleteQweet(qweet){
      // let dateToDelete = qweet.date
      // let index = this.qweets.findIndex(qweet => qweet.date === dateToDelete)
      // console.log('index: ', index)
      // this.qweets.splice(index, 1)
       deleteDoc(doc(db, "qweets", qweet.id))
    }, 
    toggleLiked(qweet){
      updateDoc(doc(db,"qweets", qweet.id), {
      liked: !qweet.liked
});
    }
  },
  mounted(){
    //const colRef = collection(db, 'qweets')
    //getDocs(colRef).then(d => console.log(d.docs))

    const q = query(collection(db, "qweets"), orderBy("date"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      
      snapshot.docChanges().forEach((change) => {
        let qweetChange = change.doc.data()
        qweetChange.id = change.doc.id

        if (change.type === "added") {
            console.log("New qweet: ", qweetChange);
            this.qweets.unshift(qweetChange)
        }
        if (change.type === "modified") {
            console.log("Modified qweet: ", qweetChange);
            let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
            Object.assign(this.qweets[index], qweetChange)

        }
        if (change.type === "removed") {
            console.log("Removed qweet: ", qweetChange);
            let index = this.qweets.findIndex(qweet => qweet.id === qweetChange.id)
            this.qweets.splice(index,1)
        }
  });
});

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
  .qweet:not(:first-child)
    border-top: 1px solid rgba(0, 0, 0, 0.12)
</style>
