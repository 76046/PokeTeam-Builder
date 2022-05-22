import m2s from "mongoose-to-swagger";
import User from "../schemas/user.js";
import Invitation from "../schemas/invitation.js";
import Rule from "../schemas/rule.js";
import Role from "../schemas/role.js";
import Type from "../schemas/type.js";
import Team from "../schemas/team.js";
import Move from "../schemas/move.js";
import Pokemon from "../schemas/pokemon.js";

const options = {
  omitFields: ["_id"],
};

const swaggerUser = m2s(User, options);
const swaggerUserAuthorize = m2s(User, {
  omitFields: ["_id", "username", "roles", "summaries", "friends"],
});
const swaggerInvitation = m2s(Invitation, options);
const swaggerRule = m2s(Rule, options);
const swaggerRole = m2s(Role, options);
const swaggerType = m2s(Type, options);
const swaggerTeam = m2s(Team, options);
const swaggerMove = m2s(Move, options);
const swaggerPokemon = m2s(Pokemon, options);

const settings = {
  openapi: "3.0.0",
  info: {
    title: "PokeBuilder API",
    version: "0.1.0",
    description:
      "This is a simple CRUD API application made with Express and documented with Swagger. This project was completed to complete the course: <b>Zarządzanie projektami informatycznymi</b> by: Abraham Kaczmarski, Anna Kuczynska, Marek Korzeniewski, Łukasz Karwowski.",
  },
  paths: {
    "/pokemon": {
      post: {
        tags: ["pokemon"],
        summary: "Add new pokemon",
        description: "",
        operationId: "addpokemon",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "pokemon object that needs to be added to the service",
            required: true,
            schema: { $ref: "#/components/schemas/pokemon" },
          },
        ],
        responses: {
          400: { description: "Invalid body or id supplied" },
          401: { description: "Unauthorized" },
        },
        security: [{ bearerAuth: [] }],
      },
      get: {
        tags: ["pokemon"],
        summary: "Find pokemon by ID",
        description: "Returns a single pokemon",
        operationId: "getpokemonById",
        produces: ["application/json", "application/xml"],
        parameters: [
          {
            name: "pokemonId",
            in: "path",
            description: "ID of pokemon to return",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: { $ref: "#/components/schemas/pokemon" },
          },
          404: { description: "pokemon not found" },
        },
      },
      patch: {
        tags: ["pokemon"],
        summary: "Update an existing pokemon",
        description: "",
        operationId: "updatepokemon",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            name: "pokemonId",
            in: "path",
            description: "ID of pokemon to update",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
          {
            in: "body",
            name: "body",
            description:
              "pokemon object that needs to be added/updated to the service",
            required: true,
            schema: { $ref: "#/components/schemas/pokemon" },
          },
        ],
        responses: {
          400: { description: "Invalid body or id supplied" },
          401: { description: "Unauthorized" },
          404: { description: "pokemon not found" },
        },
        security: [{ bearerAuth: ["write:pokemons", "read:pokemons"] }],
      },
      delete: {
        tags: ["pokemon"],
        summary: "Delete pokemon by ID",
        description: "Delete a single pokemon",
        operationId: "deletepokemonById",
        produces: ["text/plain"],
        parameters: [
          {
            name: "pokemonId",
            in: "path",
            description: "ID of pokemon to delete",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: { description: "successful operation" },
          401: { description: "Unauthorized" },
          400: { description: "Invalid ID supplied" },
          404: { description: "pokemon not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/user": {
      post: {
        tags: ["user"],
        summary: "Register new user",
        description: "",
        operationId: "adduser",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "user object that needs to be added to the service",
            required: true,
            schema: { $ref: "#/components/schemas/user" },
          },
        ],
        responses: {
          400: { description: "Invalid body or id supplied" },
          422: { description: "Already exists" },
        },
      },
      get: {
        tags: ["user"],
        summary: "Find user by ID",
        description: "Returns a single user",
        operationId: "getuserById",
        produces: ["application/json", "application/xml"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user to return",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "successful operation",
            schema: { $ref: "#/components/schemas/user" },
          },
          404: { description: "user not found" },
        },
      },
      patch: {
        tags: ["user"],
        summary: "Update an existing user",
        description: "",
        operationId: "updateuser",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user to update",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
          {
            in: "body",
            name: "body",
            description:
              "user object that needs to be added/updated to the service",
            required: true,
            schema: { $ref: "#/components/schemas/user" },
          },
        ],
        responses: {
          400: { description: "Invalid body or id supplied" },
          401: { description: "Unauthorized" },
          404: { description: "user not found" },
        },
        security: [{ bearerAuth: [] }],
      },
      delete: {
        tags: ["user"],
        summary: "Delete user by ID",
        description: "Delete a single user",
        operationId: "deleteuserById",
        produces: ["text/plain"],
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of user to delete",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: { description: "successful operation" },
          401: { description: "Unauthorized" },
          400: { description: "Invalid ID supplied" },
          404: { description: "user not found" },
        },
        security: [{ bearerAuth: [] }],
      },
    },
    "/user/login": {
      post: {
        tags: ["user"],
        summary: "Authorize user",
        description: "",
        operationId: "authorizeuser",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: { $ref: "#/components/schemas/authorize" },
          },
        ],
        responses: {
          400: { description: "Invalid body or id supplied" },
          422: { description: "Already exists" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      pokemon: swaggerPokemon,
      user: swaggerUser,
      authorize: swaggerUserAuthorize,
      rule: swaggerRule,
      role: swaggerRole,
      invitation: swaggerInvitation,
      type: swaggerType,
      team: swaggerTeam,
      move: swaggerMove,
    },
  },
};

export default settings;
