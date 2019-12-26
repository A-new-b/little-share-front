<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    :page.sync="page"
    :items-per-page="itemsPerPage"
    hide-default-footer
    @page-count="pageCount = $event"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>剩余容量{{space}}</v-toolbar-title>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          single-line
          hide-details
          style="margin-right: 1%;width: 30%"
        />
        <v-dialog v-model="dialog" max-width="fit-content">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">
              上传
              <v-icon>
                file_upload
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">上传文件</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-col>
                  <v-col>
                    <v-file-input
                      v-model="files"
                      color="deep-purple accent-4"
                      counter
                      label="File input"
                      multiple
                      placeholder="Select your files"
                      prepend-icon="mdi-paperclip"
                      outlined
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                        >
                          {{ text }}
                        </v-chip>

                        <span
                          v-else-if="index === 2"
                          class="overline grey--text text--darken-3 mx-2"
                        >
        +{{ files.length - 2 }} File(s)
      </span>
                      </template>
                    </v-file-input>
                  </v-col>
                  <v-col>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">文件名</th>
                          <th class="text-left">文件大小</th>
                          <th class="text-left">保存时长</th>
                          <th class="text-left">上传进度</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in files" :key="item.name">
                          <td>{{item.name }}</td>
                          <td>{{bytesToString(item.size)}}</td>
                          <td>{{secondsToReadable(calculate_last_time_seconds(item.time,space))}}</td>
                          <td>
                            <v-progress-circular
                              :rotate="360"
                              :value="process(item)"
                              size="40"
                              color="lime"
                            >
                              {{ process(item) }}%
                            </v-progress-circular>
                          </td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-col>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        @click="downloadItem(item)"
      >
        file_download
      </v-icon>
      <v-icon
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      暂无文件
    </template>
  </v-data-table>
    <v-pagination v-model="page" :length="pageCount"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  getFileList, getSpace, postFlie, deleteFile, getFile,
} from '../api/table';
import { bytesToString, secondsToReadable, calculate_last_time_seconds } from '../tools/tools';


export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: '文件名称',
        align: 'left',
        sortable: false,
        value: 'FileName',
      },
      { text: '文件大小', value: 'byte' },
      { text: '剩余时间', value: 'time' },
      { text: '操作', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    space: '',
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    search: '',
    files: [],
    loadingTable: false,
  }),

  computed: {

  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    bytesToString,
    secondsToReadable,
    calculate_last_time_seconds,
    initialize() {
      getSpace()
        .then(
          (res) => {
            if (res.status === 200) {
              this.space = bytesToString(res.data);
            } else {
              alert(res.status);
            }
          },
        )
        .catch();
      getFileList()
        .then(
          (res) => {
            console.log(res);
            if (res.status === 200) {
              this.desserts = res.data;
              for (const item of this.desserts) {
                item.byte = bytesToString(item.FileSizeBytes);
                item.time = secondsToReadable(item.FileSurplusKeepSeconds);
              }
            }
          },
        )
        .catch();
    },

    downloadItem(item) {
      getFile(item.FileName).then(
        (res) => {
          if (res.status === 200) {
            window.location = `/files/${item.FileName}`;
          }
        },
      ).catch();
    },

    deleteItem(item) {
      confirm('确定删除吗')
      && deleteFile(item.FileName).then(
        (res) => {
          if (res.status === 200) {
            alert('删除成功');
            this.initialize();
          }
        },
      ).catch();
    },

    close() {
      this.dialog = false;
      this.files=[];
    },

    save() {
      this.loadingTable = true;
      for (const file of this.files) {
        const formData = new FormData();
        formData.append('file', file);
        const i = this.files.indexOf(file);
        postFlie(formData,
          (res) => {
            const { loaded } = res;
            const { total } = res;
            if (Math.floor(loaded / total * 100) > 1) {
              const item = file;
              item.upload = Math.floor(loaded / total * 360);
              Vue.set(this.files, i, item);
            } else {
              const item = file;
              item.upload = 360;
              Vue.set(this.files, i, item);
            }
          })
          .then(
            (res) => {
              if (res.status === 200) {
                this.initialize();
              } else alert(`${this.files[i].name}上传异常`);
            },
          )
          .catch();
      }
    },

    process(item) {
      let value = 0;
      if (typeof (item.upload) !== 'number') {
        value = 0;
      } else {
        value = Math.floor(item.upload / 3.6);
      }
      return value;
    },
  },
};
</script>

<style scoped>

</style>
