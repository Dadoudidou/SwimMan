import * as Sequelize from "sequelize"

export class DataTypes implements Sequelize.DataTypes {
    ABSTRACT = Sequelize.ABSTRACT
    STRING = Sequelize.STRING;
    CHAR = Sequelize.CHAR;
    TEXT = Sequelize.TEXT;
    NUMBER = Sequelize.NUMBER;
    INTEGER = Sequelize.INTEGER;
    BIGINT = Sequelize.BIGINT;
    FLOAT = Sequelize.FLOAT;
    TIME = Sequelize.TIME;
    DATE = Sequelize.DATE;
    DATEONLY = Sequelize.DATEONLY;
    BOOLEAN = Sequelize.BOOLEAN;
    NOW = Sequelize.NOW;
    BLOB = Sequelize.BLOB;
    DECIMAL = Sequelize.DECIMAL;
    NUMERIC = Sequelize.NUMERIC;
    UUID = Sequelize.UUID;
    UUIDV1 = Sequelize.UUIDV1;
    UUIDV4 = Sequelize.UUIDV4;
    HSTORE = Sequelize.HSTORE;
    JSON = Sequelize.JSON;
    JSONB = Sequelize.JSONB;
    VIRTUAL = Sequelize.VIRTUAL;
    ARRAY = Sequelize.ARRAY;
    NONE = Sequelize.NONE;
    ENUM = Sequelize.ENUM;
    RANGE = Sequelize.RANGE;
    REAL = Sequelize.REAL;
    DOUBLE = Sequelize.DOUBLE;
    "DOUBLE PRECISION" = Sequelize.DOUBLE;
    GEOMETRY = Sequelize.GEOMETRY;
}
