<template>
  <div>
    <div class="game-content" style="display: none">
      <b-row class="justify-content-md-center mt-2 mb-2">
        <b-col cols="8" class="text-center game-top-content">
          <div class="countdown">
            Sisa waktu:
            <span id="show" class="font-weight-bold"></span>
          </div>
          <div class="btn btn-score btn-lg btn-primary">
            Score:
            <span class="font-weight-bold">{{totalNilai}}</span>
          </div>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center mb-2">
        <template v-for="(soal, index) in questionData">
          <b-col cols="1" :key="index" class="mb-1">
            <template v-if="is_submit == true">
              <b-button
                :variant="soal.is_correct == true ? 'success' : 'danger'"
                v-on:click.prevent="checkAnswer(index)"
              >{{soal.no}}</b-button>
            </template>
            <template v-else>
              <b-button
                :variant="soal.answer != '' ? 'dark' : 'outline-dark'"
                :disabled="true"
              >{{soal.no}}</b-button>
            </template>
          </b-col>
        </template>
      </b-row>
      <b-row class="justify-content-md-center mb-2">
        <b-col cols="6">
          <b-button v-on:click="doSubmit" block variant="warning" :disabled="is_submit == true ? true : false">Submit Quiz</b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col cols="8">
          <carousel
            :per-page="1"
            :paginationEnabled="true"
            :paginationColor="'#000000'"
            :paginationActiveColor="'#FF0000'"
            :paginationSize="15"
            :navigationEnabled="true"
            :navigationNextLabel="'Selanjutnya ▶'"
            :navigationPrevLabel="'◀ Sebelumnya'"
            :mouse-drag="false"
          >
            <template v-for="(soal, index) in questionData">
              <slide v-bind:key="index">
                <b-card no-body class="overflow-hidden">
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img :src="url.asset+'images/'+soal.image" class="rounded-0"></b-card-img>
                    </b-col>
                    <b-col md="6">
                      <b-card-body :title="'Soal Nomor '+soal.no">
                        <b-form-input
                          type="text"
                          v-model="soal.answer"
                          :readonly="is_submit == true ? true : false"
                          placeholder="Tulis jawaban kalian"
                          class="mb-2"
                        ></b-form-input>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </slide>
            </template>
          </carousel>
        </b-col>
      </b-row>

      <b-modal ref="my-modal" centered hide-footer title="Lihat Jawaban" size="lg">
        <div class="d-block text-center">
          <template v-if="showIsCorrect == true">
            <h3>KALIAN MEMANG PINTAAAR</h3>
          </template>
          <template v-else>
            <h3>HE HE ..... MAKANE SINAU BEN PINTEEEEER</h3>
          </template>
        </div>
        <b-row class="mb-2">
          <b-col sm="3">
            <label>Jawaban kalian:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input :type="'text'" :readonly="true" v-model="showAnswer"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label>Jawaban benar:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input :type="'text'" :readonly="true" v-model="showCorrectAnswer"></b-form-input>
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import { Carousel, Slide } from "vue-carousel";
import { modalConfirmation } from "../../../dependencies/notify";
import typeOne from "./soal_1.json";
import typeTwo from "./soal_2.json";
export default {
  name: "GameContent",
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapState("tebakGambar", [
      "nama_kelompok",
      "anggota_kelompok",
      "tipe_soal",
      "bobot_soal",
      "nilai"
    ])
  },
  methods: {
    timerStart: function() {
      var self = this;
      console.log(this.finishAt.diff(moment(), "seconds"));
      let timeLeft = this.finishAt.diff(moment(), "seconds");

      if (timeLeft > 0) {
        let _finish = this.finishAt;
        let interval = 1000;
        this.countDown = setInterval(function() {
          TebakGambar.$children[0].$el.querySelector(
            "#show"
          ).innerHTML = countdown(_finish._d).toString();
          timeLeft--;
          if (timeLeft === 0) {
            clearInterval(countDown);
            alert("You're out of time!");
            self.submitQuiz();
          }
        }, interval);
      } else {
        alert("You're out of time!");
        self.submitQuiz();
      }
    },
    timerStop() {
      clearInterval(this.countDown);
    },
    setCookie(cname, cvalue, exdays, path = "/") {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `${cname}=${cvalue};${expires};path=${path}`;
    },
    getCookie(cname) {
      const name = `${cname}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie() {
      if (this.getCookie("timeStart") != "") {
        this.startAt = this.getCookie("timeStart");
        this.finishAt = moment(this.startAt).add(1200, "seconds");
        console.log(this.getCookie("timeStart"));
      } else {
        this.startAt = moment();
        this.finishAt = moment().add(1200, "seconds");
        this.setCookie("timeStart", moment(), 1);
      }

      this.timerStart();
    },
    doSubmit() {
      modalConfirmation({
        focusConfirm: true,
        title: "SUBMIT QUIZ ????"
      }).then(result => {
        if (true === result.value) {
          this.timerStop();
          this.submitQuiz();
        }
      });
    },
    submitQuiz() {
      for (const INDEX in this.questionData) {
        if (
          this.questionData[INDEX].answer.toLowerCase() ==
          this.questionData[INDEX].trueAnswer.toLowerCase()
        ) {
          this.questionData[INDEX].is_correct = true;
          this.correctAnswerCount += 1;
        } else {
          this.questionData[INDEX].is_correct = false;
          this.wrongAnswerCount += 1;
        }
      }
      this.is_submit = true;
      this.totalNilai = this.bobot_soal * this.correctAnswerCount;
    },
    checkAnswer(index) {
      this.showCorrectAnswer = this.questionData[index].trueAnswer;
      this.showAnswer = this.questionData[index].answer;
      this.questionData[index].is_correct == true
        ? (this.showIsCorrect = true)
        : (this.showIsCorrect = false);
      this.$refs["my-modal"].show();
    }
  },
  props: {
    quizStart: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      quizTime: 1200,
      startAt: moment(),
      finishAt: moment(),
      countDown: null,
      questionData: [],
      is_submit: false,
      correctAnswerCount: 0,
      wrongAnswerCount: 0,
      totalNilai: 0,
      showAnswer: "",
      showCorrectAnswer: "",
      showIsCorrect: false
    };
  },
  watch: {
    quizStart() {
      if (this.quizStart == true) {
        if (this.tipe_soal == "satu") {
          this.questionData = typeOne;
        } else {
          this.questionData = typeTwo;
        }
        this.$el.querySelector(".game-content").style.display = "block";
        this.checkCookie();
      }
    }
  },
  created() {
    this.$nextTick(() => {});
  }
};
</script>

<style lang="scss" scoped>
.card-body {
  .form-control {
    font-size: 20px !important;
  }
}
.game-top-content {
  font-size: 22px !important;
}
.btn-score {
  position: fixed;
  top: 17%;
  right: 30px;
}
</style>