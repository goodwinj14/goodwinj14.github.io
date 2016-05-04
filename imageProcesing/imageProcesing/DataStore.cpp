//
//  DataStore.cpp
//  imageProcesing
//
//  Created by Mac on 4/26/16.
//  Copyright © 2016 name. All rights reserved.
//

#include "DataStore.hpp"
#include <iostream>
#include <sqlite3.h>
#include <fstream>
sqlite3 *db;
char *zErrMsg = 0;
int rc;
std::string neigborsOut;
int count = 0;
int ***idPoints;
int id;
int x=0;
int y=0;
int z=0;

//*********************************CALL BACK METHODS***********************//
static int indexSetNeighborsCallback(void *NotUsed, int argc, char **argv, char **azColName){
    
    int i;
    id = atoi(argv[0]);
    x = atoi(argv[1]);
    y = atoi(argv[2]);
    z = atoi(argv[3]);

    idPoints[x][y][z] = id; // Adds value to the array
   /* for(i=0; i<argc; i++){
        neigborsOut = azColName[i];
        printf("%s = %s, ", azColName[i], argv[i] ? argv[i] : "NULL");
    }*/
    //printf("\n");
    //std::cout << idPoints[x][y][y];
    //printf("\n");
    return 0;
}

static int callback(void *NotUsed, int argc, char **argv, char **azColName){
    int i;
    for(i=0; i<argc; i++){
        printf("%s = %s, ", azColName[i], argv[i] ? argv[i] : "NULL");
    }
    printf("\n");
    return 0;
}
//*********************************CALL BACK METHODS***********************//


ManageData::ManageData(){

    
    rc = sqlite3_open("PointSet.db", &db);
    
    if( rc ){
        fprintf(stderr, "Can't open database: %s\n", sqlite3_errmsg(db));
        exit(0);
    }else{
        fprintf(stderr, "Opened database successfully\n");
    }

   /* std::ifstream is("/Users/macBook/Desktop/voumedata/subsets/subSet_0.txt");     // open file
    std::string x ="";
    std::string y ="";
    std::string z ="";
    char c;
    long count=0;
    while (is.get(c)){          // loop getting single characters
        //cout << c;
        if(c=='['){
            while (is.get(c)&&c!=','){
                x=x+c;
            }
            while (is.get(c)&&c!=','){
                y=y+c;
            }
            while (is.get(c)&&c!=']'){
                z=z+c;
            }
        }
        count++;
        ManageData::addLocationPoint("SUB_SET_0",x,y,z);
        x ="";
        y ="";
        z ="";
        if(count%10000==0){
            std::cout << count << "\n";
        }
    }
    is.close();*/
    
    //ManageData::addColumTo("SUB_SET_0", "All_N_INDEXED");
    
    //ManageData::deletSet("SUB_SET_0");
    //ManageData::addSet("SUB_SET_0");
    //ManageData::addPoint("SET_453");
    //addLocationPoint("SET_453","3","4","3");
    //ManageData::getPoint("SET_453");
    
    //Array to hold all the ids to then check for nieghbors
    idPoints = new int**[501];
    count++;
    std::cout << count;
    std::cout << "count\n";
    for (int i =0; i<501; i++) {
        idPoints[i] = new int*[501];
        
        for (int j = 0; j < 501; ++j){
            idPoints[i][j] = new int[501];
        }
    }
    for (int z=0; z<501; z++) {
        for (int y=0; y<501; y++) {
            for (int x =0; x<501; x++) {
                idPoints[z][x][y] = -1;
            }
        }
        
    }
    //ManageData::addNeighbors("UPDATE SUB_SET_0 SET N_16 = 2, N_17 = 3, N_25 = 4, N_26 = 5 WHERE id = 1;");
    //ManageData::getPoint("SUB_SET_0");
      ManageData::indexSetNeighbors("SUB_SET_0");
    //ManageData::close();
}

void ManageData::addSet(std::string setID){
    sqlite3_stmt *statement;

    std::string table = "CREATE  TABLE " + setID + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, X_LOC INTEGER, Y_LOC INTEGER, Z_LOC INTEGER, X_Edge INTEGER, Y_Edge INTEGER, Z_Edge INTEGER, N_1 INTEGER, N_2 INTEGER, N_3 INTEGER, N_4 INTEGER, N_5 INTEGER, N_6 INTEGER, N_7 INTEGER, N_8 INTEGER, N_9 INTEGER, N_10 INTEGER, N_11 INTEGER, N_12 INTEGER, N_13 INTEGER, N_14 INTEGER, N_15 INTEGER, N_16 INTEGER, N_17 INTEGER, N_18 INTEGER, N_19 INTEGER, N_20 INTEGER, N_21 INTEGER, N_22 INTEGER, N_23 INTEGER, N_24 INTEGER, N_25 INTEGER, N_26 INTEGER);";
    const char* data = "Callback function called";

        rc = sqlite3_exec(db, table.c_str(), callback, (void*)data, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        fprintf(stdout, "Operation done successfully\n");
    }
    sqlite3_close(db); fprintf(stdout, "Operation done successfully\n");
}

void ManageData::addLocationPoint(std::string setID, std::string X, std::string Y, std::string Z){
    /* Create SQL statement */
    std::string sql = "INSERT INTO "+ setID +" (X_LOC, Y_LOC, Z_LOC) "  \
    "VALUES ("+X+","+Y+","+Z+");";
    
    /* Execute SQL statement */
    rc = sqlite3_exec(db, sql.c_str(), callback, 0, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        //fprintf(stdout, "Records created successfully\n");
    }
    
    //sqlite3_close(db); fprintf(stdout, "Operation done successfully\n");
}



void ManageData::addColumTo(std::string setID, std::string newColumName){
    sqlite3_stmt *statement;
    std::string table = " ALTER TABLE "+ setID +" ADD COLUMN "+newColumName+" TEXT;";
    const char* data = "Callback function called";
    
    rc = sqlite3_exec(db, table.c_str(), callback, (void*)data, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        fprintf(stdout, "Operation done successfully\n");
    }
}


void ManageData::getPoint(std::string SET){

    const char* data = "Callback function called";
    /* Create SQL statement */
    std::string sql = "SELECT * from "+SET;
    
    /* Execute SQL statement */
    rc = sqlite3_exec(db, sql.c_str(), callback, (void*)data, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        fprintf(stdout, "Operation done successfully\n");
    }
}

void ManageData::addPoint(std::string SET){
    /* Create SQL statement */
    std::string sql = "INSERT INTO "+ SET +" (X_LOC, Y_LOC, Z_LOC, N_1) "  \
    "VALUES (6,3,4, 20); ";
    
    /* Execute SQL statement */
    rc = sqlite3_exec(db, sql.c_str(), callback, 0, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        fprintf(stdout, "Records created successfully\n");
    }
    
}

void deleatSet(){
}

void ManageData::indexSetNeighbors(std::string setID){
    const char* data = "Callback function called";
    /* Create SQL statement */
    std::string sql = "SELECT id, X_LOC, Y_LOC, Z_LOC  from "+setID+" WHERE X_LOC BETWEEN 0 AND 1000 AND Y_LOC BETWEEN 0 AND 1000 AND Z_LOC BETWEEN 0 AND 1000;";
    
    //std::string sql = "SELECT COUNT(*) FROM SUB_SET_0";
    /* Execute SQL statement */
    rc = sqlite3_exec(db, sql.c_str(), indexSetNeighborsCallback, (void*)data, &zErrMsg);
    
    
      //ADDRESS = 'Texas' WHERE ID = 6";
    bool needsUpdate;
    for (int z=0; z<501; z++) {
        for (int y=0; y<501; y++) {
            for (int x =0; x<501; x++) {
if(idPoints[x][y][z]!=-1){
                needsUpdate=false;
                std::string update_statment = "UPDATE " + setID + " SET";
    
                //printf("**************************************************** \n");
                //printf("!!!!!!!!!!!");
                //std::cout << idPoints[x][y][z];
                //printf("\n");
                //z-1;y-1
                if(z-1>=0&&y-1>=0&&x-1>=0){
                    if(idPoints[x-1][y-1][z-1]!=-1){
                        update_statment = update_statment + " N_1 = " + std::to_string(idPoints[x-1][y-1][z-1]);
                        //std::cout << idPoints[x-1][y-1][z-1];
                        //printf("\n");
                        
                    }
                }
                if(z-1>=0&&y-1>=0){
                    if(idPoints[x][y-1][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_2 = " + std::to_string(idPoints[x][y-1][z-1]);
                        //std::cout << idPoints[x][y-1][z-1];
                        //printf("\n");
                    }
                }
                if(z-1>=0&&y-1>=0&&x+1<501){
                    if(idPoints[x+1][y-1][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_3 = " + std::to_string(idPoints[x+1][y-1][z-1]);
                        //std::cout << idPoints[x+1][y-1][z-1];
                        //printf("\n");
                    }
                }
                //Z-1;Y
                if(z-1>=0&&x-1>=0){
                    if(idPoints[x-1][y][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_4 = " + std::to_string(idPoints[x-1][y][z-1]);
                        //std::cout << idPoints[x-1][y][z-1];
                        //printf("\n");
                    }
                }
                if(z-1>=0){
                    if(idPoints[x][y][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_5 = " + std::to_string(idPoints[x][y][z-1]);
                        //std::cout << idPoints[x][y][z-1];
                        //printf("\n");
                    }
                }
                if(z-1>=0&&x+1<501){
                    if(idPoints[x+1][y][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_6 = " + std::to_string(idPoints[x+1][y][z-1]);
                        //std::cout << idPoints[x+1][y][z-1];
                        //printf("\n");
                    }
                }
                //Z-1;Y+1
                if(z-1>=0&&y+1<501&&x-1>=0){
                    if(idPoints[x-1][y+1][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_7 = " + std::to_string(idPoints[x-1][y+1][z-1]);
                        //std::cout << idPoints[x-1][y+1][z-1];
                        //printf("\n");
                    }
                }
                if(z-1>=0&&y+1<501){
                    if(idPoints[x][y+1][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_8 = " + std::to_string(idPoints[x][y+1][z-1]);
                        //std::cout << idPoints[x][y+1][z-1];
                        //printf("\n");
                    }
                }
                if(z-1>=0&&y+1<501&&x+1<501){
                    if(idPoints[x+1][y+1][z-1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_9 = " + std::to_string(idPoints[x+1][y+1][z-1]);
                        //std::cout << idPoints[x+1][y+1][z-1];
                        //printf("\n");
                    }
                }
                
                
                
//**************Z;Y-1
                if(y-1>=0&&x-1>=0){
                    if(idPoints[x-1][y-1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_10 = " + std::to_string(idPoints[x-1][y-1][z]);
                        //std::cout << idPoints[x-1][y-1][z];
                        //printf("\n");
                    }
                }
                if(y-1>=0){
                    if(idPoints[x][y-1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_11 = " + std::to_string(idPoints[x][y-1][z]);
                        //std::cout << idPoints[x][y-1][z];
                        //printf("\n");
                    }
                }
                if(y-1>=0&&x+1<501){
                    if(idPoints[x+1][y-1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_12 = " + std::to_string(idPoints[x+1][y-1][z]);
                        //std::cout << idPoints[x+1][y-1][z];
                        //printf("\n");
                    }
                }
                //Z;Y
                if(x-1>=0){
                    if(idPoints[x-1][y][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_13 = " + std::to_string(idPoints[x-1][y][z]);
                        //std::cout << idPoints[x-1][y][z];
                        //printf("\n");
                    }
                }
                
                if(x+1<501){
                    if(idPoints[x+1][y][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_14 = " + std::to_string(idPoints[x+1][y][z]);
                        //std::cout << idPoints[x+1][y][z];
                        //printf("\n");
                    }
                }
                //Z;Y+1
                if(y+1<501&&x-1>=0){
                    if(idPoints[x-1][y+1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_15 = " + std::to_string(idPoints[x-1][y+1][z]);
                        //std::cout << idPoints[x-1][y+1][z];
                        //printf("\n");
                    }
                }
                if(y+1<501){
                    if(idPoints[x][y+1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_16 = " + std::to_string(idPoints[x][y+1][z]);
                        //std::cout << idPoints[x][y+1][z];
                        //printf("\n");
                    }
                }
                if(y+1<501&&x+1<501){
                    if(idPoints[x+1][y+1][z]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_17 = " + std::to_string(idPoints[x+1][y+1][z]);
                        //std::cout << idPoints[x+1][y+1][z];
                        //printf("\n");
                    }
                }

                
                
//**************Z+1;Y-1
                if(z+1<501&&y-1>=0&&x-1>=0){
                    if(idPoints[x-1][y-1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_18 = " + std::to_string(idPoints[x-1][y-1][z+1]);
                        //std::cout << idPoints[x-1][y-1][z+1];
                        //printf("\n");
                    }
                }
                if(z+1<501&&y-1>=0){
                    if(idPoints[x][y-1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_19 = " + std::to_string(idPoints[x][y-1][z+1]);
                        //std::cout << idPoints[x][y-1][z+1];
                        //printf("\n");
                    }
                }
                if(z+1<501&&y-1>=0&&x+1<501){
                    if(idPoints[x+1][y-1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_20 = " + std::to_string(idPoints[x+1][y-1][z+1]);
                        //std::cout << idPoints[x+1][y-1][z+1];
                        //printf("\n");
                    }
                }
                //Z-1;Y
                if(z+1<501&&x-1>=0){
                    if(idPoints[x-1][y][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_21 = " + std::to_string(idPoints[x-1][y][z+1]);
                        //std::cout << idPoints[x-1][y][z+1];
                        //printf("\n");
                    }
                }
                if(z+1<501){
                    if(idPoints[x][y][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_22 = " + std::to_string(idPoints[x][y][z+1]);
                        //std::cout << idPoints[x][y][z+1];
                       // printf("\n");
                    }
                }
                if(z+1<501&&x+1<501){
                    if(idPoints[x+1][y][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_23 = " + std::to_string(idPoints[x+1][y][z+1]);
                        //std::cout << idPoints[x+1][y][z+1];
                        //printf("\n");
                    }
                }
                //Z-1;Y+1
                if(z+1<501&&y+1<501&&x-1>=0){
                    if(idPoints[x-1][y+1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_24 = " + std::to_string(idPoints[x-1][y+1][z+1]);
                        //std::cout << idPoints[x-1][y+1][z+1];
                        //printf("\n");
                    }
                }
                if(z+1<501&&y+1<501){
                    if(idPoints[x][y+1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_25 = " + std::to_string(idPoints[x][y+1][z+1]);
                        //std::cout << idPoints[x][y+1][z+1];
                        //printf("\n");
                    }
                }
                if(z+1<501&&y+1<501&&x+1<501){
                    if(idPoints[x+1][y+1][z+1]!=-1){
                        if(update_statment.back()!='T'){
                            update_statment = update_statment +",";
                        }
                        update_statment = update_statment + " N_26 = " + std::to_string(idPoints[x+1][y+1][z+1]);
                        //std::cout << idPoints[x+1][y+1][z+1];
                       // printf("\n");
                    }
                }
                if(update_statment.back()!='T'){
                    update_statment = update_statment + " WHERE id = " + std::to_string(idPoints[x][y][z]) + ";";
                    ManageData::getPoint(update_statment);
                    //std::cout << update_statment;
                    //std::cout << "\n";
                }
                //printf("**************************************************** \n");
}
            }
        }
        
    }
    
    
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        std::cout << neigborsOut;
        //sqlite3_close(db); fprintf(stdout, "Operation done successfully\n");
    }
    
}


void ManageData::addNeighbors(std::string sql_command){
    /* Create SQL statement */
    
    /* Execute SQL statement */
    rc = sqlite3_exec(db, sql_command.c_str(), callback, 0, &zErrMsg);
    if( rc != SQLITE_OK ){
        fprintf(stderr, "SQL error: %s\n", zErrMsg);
        sqlite3_free(zErrMsg);
    }else{
        fprintf(stdout, "Records created successfully\n");
    }
    
}


void ManageData::close(){
    sqlite3_close(db); fprintf(stdout, "Operation done successfully\n");
}
