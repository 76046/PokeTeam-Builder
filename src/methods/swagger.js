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
            schema: {
              $ref: "#/components/schemas/pokemon",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid body or id supplied",
          },
          401: {
            description: "Unauthorized",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
            schema: {
              $ref: "#/components/schemas/pokemon",
            },
          },
          404: {
            description: "pokemon not found",
          },
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
            schema: {
              $ref: "#/components/schemas/pokemon",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid body or id supplied",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "pokemon not found",
          },
        },
        security: [
          {
            bearerAuth: ["write:pokemons", "read:pokemons"],
          },
        ],
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
          200: {
            description: "successful operation",
          },
          401: {
            description: "Unauthorized",
          },
          400: {
            description: "Invalid ID supplied",
          },
          404: {
            description: "pokemon not found",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
            schema: {
              $ref: "#/components/schemas/user",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid body or id supplied",
          },
          422: {
            description: "Already exists",
          },
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
            schema: {
              $ref: "#/components/schemas/user",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid body or id supplied",
          },
          401: {
            description: "Unauthorized",
          },
          404: {
            description: "user not found",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    "/user/invitations": {
      get: {
        tags: ["user"],
        summary: "Get User Invitations",
        description: "",
        operationId: "getuserinvitations",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/authorize",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
        },
      },
    },
    "/user/invite": {
      post: {
        tags: ["user"],
        summary: "Post User Invite",
        description: "",
        operationId: "postuserinvite",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/authorize",
            },
          },
        ],
        responses: {
          400: {
            description: "You are requestee",
          },
          404: {
            description: "Requestee not found",
          },
        },
      },
    },
    "/user/login": {
      post: {
        tags: ["user"],
        summary: "Post User Login",
        description: "",
        operationId: "postuserlogin",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/authorize",
            },
          },
        ],
        responses: {
          400: {
            description: "Invalid body or id supplied",
          },
          422: {
            description: "Already exists",
          },
        },
      },
    },
    "/user/{userId}": {
      get: {
        tags: ["user"],
        summary: "Get User By Id",
        description: "",
        operationId: "getuserbyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          400: {
            description: "Invalid body or id supplied",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      delete: {
        tags: ["user"],
        summary: "Delete User By Id",
        description: "",
        operationId: "deleteuserbyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "userId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/team": {
      post: {
        tags: ["team"],
        summary: "post team",
        description: "",
        operationId: "postteam",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/team",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    "/team/{teams}": {
      get: {
        tags: ["team"],
        summary: "Get team",
        description: "",
        operationId: "getteam",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "team",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/team/{teamId}": {
      get: {
        tags: ["team"],
        summary: "Get Team By Id",
        description: "",
        operationId: "getteambyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "teamId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      patch: {
        tags: ["team"],
        summary: "Patch Team By Id",
        description: "",
        operationId: "patchteambyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "teamId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      delete: {
        tags: ["team"],
        summary: "Delete Team By Id",
        description: "",
        operationId: "deleteteambyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "teamId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/summary": {
      post: {
        tags: ["summary"],
        summary: "Post Summary",
        description: "",
        operationId: "postsummary",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/summary",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/summary/{summaries}": {
      get: {
        tags: ["summary"],
        summary: "Get Summaries",
        description: "",
        operationId: "getsummaries",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "summary",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/summary/{summaryId}": {
      get: {
        tags: ["summary"],
        summary: "Get Summary By Id",
        description: "",
        operationId: "getsummarybyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "summaryId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      patch: {
        tags: ["summary"],
        summary: "Patch Summary By Id",
        description: "",
        operationId: "patchsummarybyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "summaryId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      delete: {
        tags: ["summary"],
        summary: "Delete Summary By Id",
        description: "",
        operationId: "deletesummarybyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "summaryId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/rule": {
      post: {
        tags: ["rule"],
        summary: "Post Rule",
        description: "",
        operationId: "postrule",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/rule",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          201: {
            description: "Created",
          },
          401: {
            description: "Not authorized",
          },
          422: {
            description: "Already exists",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/rule/{rules}": {
      get: {
        tags: ["rule"],
        summary: "Get Rules",
        description: "",
        operationId: "getrules",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "rule",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/rule/{ruleId}": {
      get: {
        tags: ["rule"],
        summary: "Get Rule By Id",
        description: "",
        operationId: "getrulebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "ruleId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      patch: {
        tags: ["rule"],
        summary: "Patch Rule By Id",
        description: "",
        operationId: "patchrulebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "ruleId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      delete: {
        tags: ["rule"],
        summary: "Delete Rule By Id",
        description: "",
        operationId: "deleterulebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "ruleId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/move": {
      post: {
        tags: ["move"],
        summary: "Post Move",
        description: "",
        operationId: "postmove",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/move",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/move/{moves}": {
      get: {
        tags: ["moves"],
        summary: "Get Moves",
        description: "",
        operationId: "getmoves",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "move",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
    "/move/{moveId}": {
      get: {
        tags: ["move"],
        summary: "Get Move By Id",
        description: "",
        operationId: "getmovebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "moveId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
      patch: {
        tags: ["move"],
        summary: "Patch Move By Id",
        description: "",
        operationId: "patchmovebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "moveId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      delete: {
        tags: ["move"],
        summary: "Delete Move By Id",
        description: "",
        operationId: "deletemovebyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "moveId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/invitation": {
      post: {
        tags: ["invitation"],
        summary: "Post Invitation",
        description: "",
        operationId: "postinvitation",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "pokemon object that needs to be added to the service",
            required: true,
            schema: {
              $ref: "#/components/schemas/invitation",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/invitation/{invitationId}": {
      get: {
        tags: ["invitation"],
        summary: "Get Invitations By Id",
        description: "",
        operationId: "getinvitationsbyd",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "invitationId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
      delete: {
        tags: ["invitation"],
        summary: "Delete Invitation By Id",
        description: "",
        operationId: "deleteinvitationbyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "invitationId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/invitation/accept/{invitationId}": {
      get: {
        tags: ["invitation"],
        summary: "Get Accept By Id",
        description: "",
        operationId: "getacceptbyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "invitationId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          404: {
            description: "Not Found",
          },
          500: {
            description: "Internal server error",
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    "/invitation/reject/{invitationId}": {
      get: {
        tags: ["invitation"],
        summary: "Get Reject By Id",
        description: "",
        operationId: "getrejectbyid",
        consumes: ["application/json", "application/xml"],
        produces: ["application/json"],
        parameters: [
          {
            name: "invitationId",
            in: "path",
            required: true,
            type: "string",
            example: "61d8afa5bb45e0eaa4f6f867",
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
          401: {
            description: "Not authorized",
          },
          404: {
            description: "Not found",
          },
          500: {
            description: "Internal server error",
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
        },
      },
    },
    "/engine/team": {
      post: {
        tags: ["engine"],
        summary: "Generate Team",
        description: "",
        operationId: "generateteam",
        consumes: ["application/json", "application/xml"],
        produces: [" text/plain"],
        parameters: [
          {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              $ref: "#/components/schemas/engine",
            },
          },
        ],
        responses: {
          200: {
            description: "Success",
          },
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
