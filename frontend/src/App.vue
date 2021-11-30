<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-data-table
        :headers="headers"
        :items="clients"
        class="elevation-1"
        :search="search"
        :custom-filter="filterOnlyCapsText"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Clientes</v-toolbar-title>
            <v-spacer />
            <v-spacer />
            <v-btn class="mx2" color="#e040fb" @click="createClient()">New Client</v-btn>
          </v-toolbar>

          <v-text-field
            v-model="search"
            label="Search (UPPER CASE ONLY)"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.providers="{ item }">
          <div v-for="(provider, key) in item.providers" :key="key">
            {{ provider.name }}
          </div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            class="mx1"
            @click="editClient(item._id, item.name, item.email, item.phone, item.providers)"
            >EDIT</v-btn
          >
          <v-btn class="mx1" color="#e040fb" @click="deleteClient(item._id)"> DELETE</v-btn>
        </template>
      </v-data-table>
      <!--
       component to create a new customer and modify
     -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-form>
            <v-container>
              <v-row>
                <input v-model="client.id" hidden />
                <v-col cols="12">
                  <v-text-field v-model="client.name" label="Client Name" solo required>{{
                    client.name
                  }}</v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="client.email" label="Client Email" solo required
                    >{{ client.email }}
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="client.phone" label="Client Phone" solo required>
                    {{ client.phone }}
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="provider.name" label="Client Providers" Solo required>
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-btn @click="saveProvider">Add Provider</v-btn>
                </v-col>
                <v-col cols="12">
                  <v-data-table
                    :headers="headerproviders"
                    :items="dataproviders"
                    :hide-default-footer="true"
                    :single-select="singleSelect"
                    item-key="_id"
                    show-select
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-icon small color="black darken-2"> mdi-pencil-box-outline</v-icon>
                      <v-btn icon @click="deleteProvider(item._id)"
                        ><v-icon small="black darken-2"
                          >{{ item.name }} mdi-trash-can
                        </v-icon></v-btn
                      >
                    </template>
                  </v-data-table>
                </v-col>
                <v-col cols="12">
                  <v-btn @click="save">save </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import ServiceClient from "./services/clients.js";
import ServiceProvider from "./services/providers.js";
export default {
  name: "App",
  mounted() {
    this.load();
    this.loadProviders();
  },
  components: {
    //
  },

  data: () => ({
    headers: [
      {
        text: "Name",
        value: "name",
        sortable: true,
      },
      {
        text: "Email",
        value: "email",
        sortable: false,
      },
      {
        text: "Phone",
        value: "phone",
        sortable: false,
      },
      {
        text: "Providers",
        value: "providers",
        sortable: false,
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    headerproviders: [
      {
        text: "",
        value: "selected",
      },
      {
        text: "name",
        value: "name",
        sortable: true,
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false,
      },
    ],
    client: {
      id: null,
      name: "",
      email: "",
      phone: "",
      providers: [],
    },
    provider: {
      id: null,
      name: "",
    },
    search: "",
    clients: [],
    dataproviders: [],
    dialog: false,
    operation: "",
  }),
  methods: {
    async load() {
      const allClients = await ServiceClient.allClients();
      this.clients = allClients.data.data || [];
    },
    async deleteClient(id) {
      await ServiceClient.deleteClient(id);
      this.load();
    },
    createClient() {
      this.dialog = true;
      this.operation = "newClient";
    },
    async save() {
      const parameters = {
        name: this.client.name,
        email: this.client.email,
        phone: this.client.phone,
        providers: this.client.providers,
      };
      if (this.operation == "newClient") {
        await ServiceClient.saveClient(parameters);
      } else {
        await ServiceClient.updateClient(this.client.id, parameters);
      }
      this.load();
      this.client.name = "";
      this.client.phone = "";
      this.client.email = "";
      this.client.providers = [];
      this.dialog = false;
    },
    editClient(id, name, email, phone, providers) {
      this.client.id = id;
      this.client.name = name;
      this.client.email = email;
      this.client.phone = phone;
      this.client.providers = providers;
      this.dialog = true;
      this.operation = "editClient";
    },
    async loadProviders() {
      const allproviders = await ServiceProvider.allProviders();
      this.dataproviders = allproviders.data.data || [];
    },
    async saveProvider() {
      const parameters = {
        name: this.provider.name,
      };
      await ServiceProvider.saveProvider(parameters);
      this.loadProviders();
    },
    async deleteProvider(id) {
      await ServiceProvider.deleteProvider(id);
      this.loadProviders();
    },
  },
};
</script>
