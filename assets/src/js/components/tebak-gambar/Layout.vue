<template>
  <div>
    <b-container class="bv-example-row bv-example-row-flex-cols">
      <b-row class="form-quiz justify-content-md-center mt-5">
        <b-col cols="6" class="form-box">
          <h1 class="text-center text-white">LOMBA TEBAK GAMBAR KRAFTHAUS</h1>
          <b-form v-on:submit.prevent="mulaiQuiz()">
            <b-form-group
              id="input-group-1"
              label="Nama Kelompok:"
              label-for="input-1"
              label-size="lg"
            >
              <b-form-input id="input-1" type="text" v-model="namaKelompok" required></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Anggota Kelompok:"
              label-for="input-2"
              label-size="lg"
            >
              <b-form-textarea
                id="textarea"
                v-model="anggotaKelompok"
                required
                placeholder
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <b-row class="justify-content-md-center">
              <b-col cols="7" class="text-center">
                <b-form-group id="input-group-3">
                  <b-form-radio-group
                    id="btn-radios-2"
                    v-model="tipeSoal"
                    :options="opsi"
                    required
                    buttons
                    button-variant="outline-danger"
                    size="lg"
                    name="radio-btn-outline"
                  ></b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-button type="submit" block variant="dark" size="lg">Mulai Quiz</b-button>
          </b-form>
        </b-col>
      </b-row>
      <game-content v-bind:quiz-start="quizIsStart"></game-content>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import Tone from "tone";
import { mapActions, mapState } from "vuex";
import { modalConfirmation } from "../../dependencies/notify";
import GameContent from "./content/GameContent.vue";
export default {
  name: "MainQuizContainer",
  components: {
    "game-content": GameContent
  },
  computed: {
    ...mapState("tebakGambar", [
      "nama_kelompok",
      "anggota_kelompok",
      "tipe_soal",
      "bobot_soal"
    ])
  },
  methods: {
    ...mapActions("tebakGambar", {
      setNamaKelompok: "namaKelompok",
      setAnggotaKelompok: "anggotaKelompok",
      setTipeSoal: "tipeSoal"
    }),
    mulaiQuiz() {
      modalConfirmation({
        focusConfirm: true,
        title: "MULAI QUIZ ????"
      }).then(result => {
        if (true === result.value) {
          console.log("MULAI QUIZ");
          this.setNamaKelompok(this.namaKelompok);
          this.setAnggotaKelompok(this.anggotaKelompok);
          this.setTipeSoal(this.tipeSoal);
          this.quizIsStart = true;
          var synth = new Tone.MonoSynth({
            oscillator: {
              type: "square"
            },
            envelope: {
              attack: 0.1
            }
          }).toMaster();
          synth.triggerAttackRelease("C3", "8n");
          this.$el.querySelector(".form-quiz").style.display = "none";
        }
      });
    }
  },
  data() {
    return {
      quizIsStart: false,
      namaKelompok: "",
      anggotaKelompok: "",
      tipeSoal: "",
      opsi: [
        { text: "Soal Tipe 1", value: "satu" },
        { text: "Soal Tipe 2", value: "dua" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.form-quiz {
  .form-box {
    padding: 20px;
    border: 10px solid;
    border-color: seagreen;
    border-radius: 10px;
  }
}
.form-group {
  .form-control {
    font-size: 20px !important;
  }
}
</style>