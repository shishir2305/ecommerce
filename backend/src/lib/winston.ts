/**
 * Node modules
 */
import winston from "winston";

/**
 * Custom modules
 */
import config from "@/config";

const {combine, timestamp, json, errors, align, printf, colorize} = winston.format