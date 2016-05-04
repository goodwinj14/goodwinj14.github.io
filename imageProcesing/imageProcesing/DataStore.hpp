//
//  DataStore.hpp
//  imageProcesing
//
//  Created by Mac on 4/26/16.
//  Copyright © 2016 name. All rights reserved.
//

#ifndef DataStore_hpp
#define DataStore_hpp

#include <stdio.h>
#include <iostream>

    class ManageData
{
public:
    ManageData();
    void addPoint(std::string);
    void getPoint(std::string);
    void clearTable();
    void addSet(std::string);
    void deletSet(std::string);
    void addLocationPoint(std::string,std::string,std::string,std::string);
    void addColumTo(std::string, std::string);
    void indexSetNeighbors(std::string);
    void addNeighbors(std::string);
    void close();
protected:
private:
    
};

#endif /* DataStore_hpp */
