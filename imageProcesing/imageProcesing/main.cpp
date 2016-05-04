//
//  main.cpp
//  imageProcesing
//
//  Created by name on 2/17/16.
//  Copyright © 2016 name. All rights reserved.
//

#include <iostream>
#include <iostream>
#include <fstream>
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include "opencv2/imgproc/imgproc.hpp"
#include <cstring>
#include <thread>
#include <queue>
#include <vector>
#include <math.h>
#include <stack>
#include "DataStore.hpp"
using namespace std;
using namespace cv;

void proccessingHandeler(std::string, int, int);
void applyThreshold(std::string src, int evalStart, int evalEnd );
void drawOutline(int evalStart, int evalEnd );
void islandRemovel(int, int);
void loadDataSet(std::string);
void evalSymitry(cv::Mat[],int,int,int,int);
void findSubset(cv::Mat dataSet[], int, int ,int);

void reApply();
//Queue of images to be cleaned up with island removal
queue <cv::Mat> threasholdImages;
//Queue of images to have a outline drawn around them
queue <cv::Mat> distiledImages;

cv::Mat input1;

bool outLineFinished = false;

int main(int argc, const char * argv[]) {
    // insert code here...
    //cv::Mat img = cv::imread("/Users/name/Desktop/voumedata/LayerOneFilter/output-0.tif", CV_LOAD_IMAGE_COLOR);
    
    
    //proccessingHandeler("/Users/macBook/Desktop/voumedata/tiffs/output", 0, 1065);
    
    const int ROWS=1536, COLS=2048, PLANES=1;
    int dims[3] = {ROWS, COLS, PLANES};
    cv::Mat input3 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output2.tif" , CV_LOAD_IMAGE_COLOR);
    cv::Mat input4 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output3.tif" , CV_LOAD_IMAGE_COLOR);
    cv::Mat input5 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output4.tif" , CV_LOAD_IMAGE_COLOR);
    cv::Mat input6 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output5.tif" , CV_LOAD_IMAGE_COLOR);
    //cv::Mat m = cv::Mat(3, dims, CV_8UC3, Scalar(255, 255, 255));
     input1 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output0.tif" , CV_LOAD_IMAGE_COLOR);
    namedWindow( "Contours", CV_WINDOW_AUTOSIZE );
    
   // imshow( "Contours", input1);
    cv::Mat input2 = cv::imread("/Users/macBook/Desktop/voumedata/testLineEvalSet/output1.tif" , CV_LOAD_IMAGE_COLOR);
    cv::Mat inputtest = cv::Mat(input1.rows, input1.cols, CV_8UC3, Scalar(255, 255, 255));
    cv::Mat planeArrays[1000];
    
    /*for(int i =0; i<1000; i++){
    String url = "/Users/macBook/Desktop/voumedata/testLineEvalSet/output" + std::to_string(i);
    url = url + ".tif";
    planeArrays[i]=cv::imread(url, CV_LOAD_IMAGE_COLOR);
    }*/

    //namedWindow( "Contours", CV_WINDOW_AUTOSIZE );
    
    
    //Must take in a odd number for window size
    //evalSymitry(planeArrays,2048, 1536, 3,3);
    //imshow( "Contours", input1);

    //proccessingHandeler("/Users/macBook/Desktop/voumedata/tiffs/output", 1063, 1066);
    ManageData data;

   
    

    //findSubset(planeArrays, 1000, 1000, 1000);
    cv::waitKey(0);                                          // Wait for a keystroke in the window
    return 0;
}




/*
void loadDataSet(std::string url){
    //Arrray to hold the set of data
    String point = "";
    String xLoc;
    String yLoc;
    String zLoc;

    String xEdge;
    String yEdge;
    String zEdge;
    
    int arrayPostion = 0;
    std::queue<int**> myqueue;
    int sizes[] = { 1064, 1536, 2048 };
    const int ROWS=1536, COLS=2048, PLANES=1064;
    int dims[3] = {ROWS, COLS, PLANES};
    cv::Mat m = cv::Mat(3, dims, CV_32SC1);
    
    ifstream file("/Users/macBook/Desktop/voumedata/points.txt");
    if(file.is_open())
    {
        char c;

        while(file.get(c)){
            while (c!=' '){          // loop getting single characters
                file.get(c);
                file.get(c);
                    while(c!=','){
                        xLoc = xLoc + c;
                        file.get(c);
                    }file.get(c);
                    while(c!=','){
                        yLoc = yLoc + c;
                        file.get(c);
                    }file.get(c);
                    while(c!='>'){
                        zLoc = zLoc + c;
                        file.get(c);
                    }
                    file.get(c);
                    file.get(c);
                    while(c!=','){
                        xEdge = xEdge + c;
                        file.get(c);
                    }file.get(c);
                    while(c!=','){
                        yEdge = yEdge + c;
                        file.get(c);
                    }file.get(c);
                    while(c!='>'){
                        zEdge = zEdge + c;
                        file.get(c);
                    }
                    file.get(c);
                    file.get(c);
                int *point[2];
                int location[3];
                int edgeOrien[3];
                m.at<Vec3b>(std::stoi(yLoc),std::stoi(xLoc),std::stoi(zLoc))[0] = std::stoi(xEdge);
                m.at<Vec3b>(std::stoi(yLoc),std::stoi(xLoc),std::stoi(zLoc))[1] = std::stoi(yEdge);
                m.at<Vec3b>(std::stoi(yLoc),std::stoi(xLoc),std::stoi(zLoc))[2] = std::stoi(zEdge);
               
                //cout<<  m.at<Vec3b>(std::stoi(yLoc),std::stoi(xLoc),std::stoi(zLoc));
                
                
                xLoc = "";
                yLoc = "";
                zLoc = "";
                
                xEdge = "";
                yEdge = "";
                zEdge = "";
                }
        }
        std::cout << myqueue.size() << "\n";
    }
}

*/

/*
 *Takes in the file path of the folder holding the images to proccess and the first and last image to be proccessed
 *
 *Creates two threads one to handel the adaptive thresholding and another to handel the island removel
 *
 *images should all have the name except for a slice number at the end.
 *exp. output-0 , output-1, output-2
 *As shown above only the first 3 image slices all have the same name but with a unique slice number at the end
 *to specify where in the original image stack that image came from.
 */
void proccessingHandeler(std::string src, int evalStart, int evalEnd){
    
    std::thread islandRemovealThread(islandRemovel, evalStart, evalEnd);
    islandRemovealThread.detach();
    
    std::thread drawOutlineThread(drawOutline, evalStart, evalEnd);
    drawOutlineThread.detach();

    std::thread threasholdThread(applyThreshold, src, evalStart, evalEnd);
    threasholdThread.join();
    

}


/*
 *Takes in the file path of the folder holding the images to proccess and the first and last image to be proccessed
 *
 *Applyes a adaptive threshhold to those images
 *
 *images should all have the name except for a slice number at the end.
 *exp. output-0 , output-1, output-2
 *As shown above only the first 3 image slices all have the same name but with a unique slice number at the end
 *to specify where in the original image stack that image came from.
 */
void applyThreshold(std::string src, int evalStart, int evalEnd){
    std::string url;
    for (int i = evalStart; i<evalEnd; i++) {
        url = src + std::to_string(i);
        url = url + ".tif";
        cv::Mat input = cv::imread(url , CV_LOAD_IMAGE_COLOR);
        //Converts the image to a greyScale image
        cv::cvtColor(input, input, CV_BGR2GRAY);
        
        //Applys a threshold to the image.
        cv::adaptiveThreshold(input, input, 255, cv::ADAPTIVE_THRESH_GAUSSIAN_C, cv::THRESH_BINARY, 55, 0);
        cv::cvtColor(input, input, CV_GRAY2BGR);
        threasholdImages.push(input);
    }
}

/*
 *Takes in an image and removes the fuzz from the image
 */

/***!!!!!!!!!!!!!!MAKE A POINT RECERENCEINSTEAD!!!!!!!!!!!!!!!**/
void islandRemovel(int evalStart, int evalEnd){
    int currentEvalPos = evalStart;
    std::string url;
    
    while(currentEvalPos<evalEnd){
        if(threasholdImages.size()>0){
            cv::Mat evalImage = threasholdImages.front(); //cv::imread("/Users/name/Desktop/out.tif" , CV_LOAD_IMAGE_COLOR);
            threasholdImages.pop();
            
            

            int rows = evalImage.rows;
            int cols = evalImage.cols;
            Vec3b curValHolder;

            for (int y = 0; y<rows; y++) {
                for (int x = 0; x<cols; x++) {
                    
                    Vec3b color = evalImage.at<Vec3b>(Point(x,y));
                    int sideCoverageWhite = 0;
                    int sideCoverageBlack = 0;
                    
                    if(x-1>=0){
                        if(evalImage.at<Vec3b>(Point((x-1),y))[0]==255){
                            sideCoverageWhite++;
                        }else{
                            sideCoverageBlack++;
                        }
                    }
                    
                    if(x+1<cols){
                        if(evalImage.at<Vec3b>(Point((x+1),y))[0]==255){
                            sideCoverageWhite++;
                        }else{
                            sideCoverageBlack++;
                        }
                    }
                    
                    if(y-1>=0){
                        
                        if(x-1>=0){
                            if(evalImage.at<Vec3b>(Point((x-1),y-1))[0]==255){
                                sideCoverageWhite++;
                            }else{
                                sideCoverageBlack++;
                            }
                        }
                        
                        if(evalImage.at<Vec3b>(Point((x),y-1))[0]==255){
                            sideCoverageWhite++;
                        }else{
                            sideCoverageBlack++;
                        }
                        
                        if(x+1<cols){
                            
                            if(evalImage.at<Vec3b>(Point((x+1),y-1))[0]==255){
                                sideCoverageWhite++;
                            }else{
                                sideCoverageBlack++;
                            }
                        }
                    }

                    if(y+1<rows){
                        
                        if(x-1>=0){
                            if(evalImage.at<Vec3b>(Point((x-1),y+1))[0]==255){
                                sideCoverageWhite++;
                            }else{
                                sideCoverageBlack++;
                            }
                        }
                        
                        if(evalImage.at<Vec3b>(Point((x),y+1))[0]==255){
                            sideCoverageWhite++;
                        }else{
                            sideCoverageBlack++;
                        }
                        
                        if(x+1<cols){
                            if(evalImage.at<Vec3b>(Point((x+1),y+1))[0]==255){
                                sideCoverageWhite++;
                            }else{
                                sideCoverageBlack++;
                            }
                        }
                        
                    }
                    
                    if(sideCoverageWhite==8){
                        color[0]=255;
                        color[1]=255;
                        color[2]=255;
                    }
                    
                    if(sideCoverageBlack==8){
                        color[0]=0;
                        color[1]=0;
                        color[2]=0;
                    }
                    
                    evalImage.at<Vec3b>(Point(x,y)) = color;
                }
            }
            distiledImages.push(evalImage);
            //url = "/Users/macBook/Desktop/islandTest_" + std::to_string(currentEvalPos);
            //url = url + ".tif";
            //imwrite(url, evalImage);
           // std::cout << currentEvalPos << "\n" ;
            currentEvalPos++;
        }
    }
}




/*
 *Draws the out lines of the distiled images
*/
void drawOutline(int outLineStart, int outLineEnd){
    int outlinedSlices = 0;
    cv::Mat prevImage;
    cv::Mat currentImage;
    cv::Mat NextImage;
    cv::Mat outLineImage;
    
    Vec3b color;
    Vec3b xPrevColor;
    Vec3b xNextColor;
    Vec3b yPrevColor;
    Vec3b yNextColor;
    Vec3b zPrevColor;
    Vec3b zNextColor;
    
    Vec3b edgeOrientation = Vec3b(0,0,0);

    std::ofstream myfile;
    myfile.open ("/Users/macBook/Desktop/voumedata/points.txt");

    while(outlinedSlices<outLineEnd){
        if(distiledImages.size()>0){
            cout << "called";

                NextImage = distiledImages.front();
                distiledImages.pop();

            if(!currentImage.empty()){
                //Erase later only used to hold testing data
                cv::Mat testingTempImg = cv::Mat(currentImage.rows, currentImage.cols, CV_8UC3, Scalar(255, 255, 255));
                ////////////////////////////////////////////
                cv::Mat outLineImage = cv::Mat(currentImage.rows, currentImage.cols, CV_8UC3, Scalar(255, 255, 255));
                //cout << "black";
                //Cycle through all position in the image
                for (int y = 0; y<currentImage.rows; y++) {
                    for (int x = 0; x < currentImage.cols; x++) {
                        color = currentImage.at<Vec3b>(Point(x,y));
                        edgeOrientation[0] = 0;
                        edgeOrientation[1] = 0;
                        edgeOrientation[2] = 0;
                        if(x-1>=0){
                            xPrevColor = currentImage.at<Vec3b>(Point(x-1,y));
                        }
                        if(x+1<currentImage.cols){
                            xNextColor = currentImage.at<Vec3b>(Point(x+1,y));
                        }
                        if(y-1>=0){
                            yPrevColor = currentImage.at<Vec3b>(Point(x,y-1));
                        }
                        if(y+1<currentImage.rows){
                            yNextColor = currentImage.at<Vec3b>(Point(x,y+1));
                        }
                        if(!prevImage.empty()){
                            zPrevColor = prevImage.at<Vec3b>(Point(x,y));
                        }
                        if(!NextImage.empty()){
                            zNextColor = NextImage.at<Vec3b>(Point(x,y));
                        }
                        
                        
                        
                        if(color[1]!=255){
                            
                            //point values
                            /*
                             ****   [<x,y,z> <edgeX, edgeY, edgeZ>]
                             
                             **** <x,y,z> = location relative to the to the original image stack
                             
                             **** <edgeX, edgeY, edgeZ> Tells usse which direction the white area our outer edge of the line is
                             
                             edge values:
                                0 no outeredge
                                1 outer edge to the left of the point
                                3 outer edge to the right of the point
                             
                             */
                            
                            
                            //Checks previous X and next X
                            if(xPrevColor[1]==255){
                                edgeOrientation[0]++;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                                //cout << "black";
                            }if(xNextColor[1]==255){
                                edgeOrientation[0] = edgeOrientation[0]+2;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                            }
                            
                            //Checks previous Y and next Y
                            if(yPrevColor[1]==255){
                                edgeOrientation[1]++;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                                //cout << "black";
                            }if(yNextColor[1]==255){
                                edgeOrientation[1] = edgeOrientation[1]+2;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                            }
                            //----------------------------
                            
                            //Checks previous Z and next Z
                            if(zPrevColor[1]==255){
                                edgeOrientation[2]++;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                                //cout << "black";
                            }if(zNextColor[2]==255){
                                edgeOrientation[2] = edgeOrientation[2]+2;
                                outLineImage.at<Vec3b>(Point(x,y))[0]=0;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=0;
                            }
                            //----------------------------
                            
                          
                            
                            if(edgeOrientation[0]==3){
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=255;
                            }if(edgeOrientation[1]==3){
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=255;
                            }if(edgeOrientation[2]==3){
                                outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                                outLineImage.at<Vec3b>(Point(x,y))[2]=255;
                            }
                            
                            if(outLineImage.at<Vec3b>(Point(x,y))[0]!=255 || outLineImage.at<Vec3b>(Point(x,y))[1]!=255 || outLineImage.at<Vec3b>(Point(x,y))[2]!=255){
                            String point =  "[<" + std::to_string(x) + "," + std::to_string(y) + "," + std::to_string(outlinedSlices) +">" + "<" + std::to_string(edgeOrientation[0]) + "," + std::to_string(edgeOrientation[1]) + "," + std::to_string(edgeOrientation[2]) + ">" + "] ";
                                testingTempImg.at<Vec3b>(Point(x,y))[0] = edgeOrientation[0];
                                testingTempImg.at<Vec3b>(Point(x,y))[1] = edgeOrientation[1];
                                testingTempImg.at<Vec3b>(Point(x,y))[2] = edgeOrientation[2];
                                //myfile << point;
                            }
                            
                            // "<" << x << "," << y  <<  "," << outlinedSlices << ">" << "<" << edgeOrientation[] << "," << edgeOrientation[1] << "," << edgeOrientation[2] << ">" << "\n";
                        }else{
                           // outLineImage.at<Vec3b>(Point(x,y))[0]=255;
                           // outLineImage.at<Vec3b>(Point(x,y))[1]=255;
                           // outLineImage.at<Vec3b>(Point(x,y))[2]=255;
                        }
                        
                        
                    }
                }
                
                
                
                for (int y = 0; y<currentImage.rows; y++) {
                    for (int x = 0; x < currentImage.cols; x++) {
                        if(outLineImage.at<Vec3b>(Point(x,y))[1]!=0&&outLineImage.at<Vec3b>(Point(x,y))[1]!=255){
                        cout<< "false value" << "\n";
                        }
                    }
                }
                
                std::string url = "/Users/macBook/Desktop/voumedata/testLineEvalSet/output" + std::to_string(outlinedSlices);
                url = url + ".tif";
                imwrite(url, testingTempImg);
                
                 /*std::string url = "/Users/macBook/Desktop/voumedata/TestImg/output" + std::to_string(outlinedSlices);
                 url = url + ".tif";
                 imwrite(url, outLineImage);*/
                outlinedSlices++;
            }
        
            prevImage = currentImage;
            currentImage = NextImage;

            
            if(!outLineImage.empty()){
            
            namedWindow( "Contours", CV_WINDOW_AUTOSIZE );
            imshow( "Contours", outLineImage);
            }
        }
    }
    outLineFinished = true;
}

void evalSymitry(cv::Mat dataSet[], int cols, int rows, int planes, int windowSize){
    //ForLoop for the current point we evaluating within the data set
    int dims[3] = {windowSize, windowSize, windowSize};
    cv::Mat window = cv::Mat(3, dims, CV_LOAD_IMAGE_COLOR);
    std::queue<Vec3b> evalLine;
     //cv::Mat(rows, cols, CV_8UC3, Scalar(0, 0, 0));
    //Values for calculating x simularity
    int xSim=0;
    int ySim=0;
    int zSim=0;
    int totalPoint=0;
    int asymValue=0;
    Vec3b evalPoint;
    //

    for (int z=0; z<6; z++) {
        cv::Mat testingTempImg = dataSet[z];
        for (int y=0; y<rows; y++) {
            for (int x=0; x<cols; x++) {
                //Check to see if the current point actually belongs to a line
                xSim = 0;
                ySim = 0;
                zSim = 0;
                totalPoint=0;
                asymValue = 0;
                if(dataSet[z].at<Vec3b>(Point(x,y))[0]!=255||dataSet[z].at<Vec3b>(Point(x,y))[1]!=255||dataSet[z].at<Vec3b>(Point(x,y))[2]!=255){
                    Vec3b test = dataSet[z].at<Vec3b>(Point(x,y));
                    int xCurnt = test[0];
                    int yCurnt = test[1];
                    int zCurnt = test[2];
                    for (int z1= -windowSize/2; z1<=windowSize/2; z1++) {
                        for (int y1= -windowSize/2; y1<=windowSize/2; y1++) {
                            for (int x1= -windowSize/2; x1<=windowSize/2; x1++) {
                                
                                //Checks to see if point is with in bounds
                                if(((x+x1)>=0&&(x+x1)<=x+(windowSize/2))&&((y+y1)>=0&&(y+y1)<=y+(windowSize/2))&&((z+z1)>=0&&(z+z1)<=z+(windowSize/2))){
                                    evalPoint = dataSet[z].at<Vec3b>(Point((x+x1),(y+y1)));
                                    if(evalPoint[0]!=255&&evalPoint[1]!=255&&evalPoint[2]!=255){
                                        int xTemp = evalPoint[0];
                                        int yTemp = evalPoint[1];
                                        int zTemp = evalPoint[2];

                                
                                        
                                        totalPoint++;
                                        asymValue = xSim + ySim + ySim;
                                       // cout << yTemp << "\n";
                                       // cout << zTemp << "\n";
                                    }
                                }
                            }
                        }
                    }
                    if(asymValue>0){
                    cout << asymValue << "\n";
                    }
                }

                if(asymValue>=4){
                    testingTempImg.at<Vec3b>(Point(x,y))[0]=255;
                    testingTempImg.at<Vec3b>(Point(x,y))[1]=255;
                    testingTempImg.at<Vec3b>(Point(x,y))[2]=255;
                }
               
                //cout << "stop" << "\n";
               // cout << x << "\n";
            }
        }
        String url = "/Users/macBook/Desktop/voumedata/testLineEvalSet/output" + std::to_string(z);
        url = url + ".tif";
        imwrite(url, testingTempImg);

    }
        cout << "stop" << "\n";
        //imshow( "Contours", testingTempImg);
    
}

void findSubset(cv::Mat dataSet[], int cols, int rows, int planes){
    cout << "Subset Start" << "\n";
    //cv::Mat(rows, cols, CV_8UC3, Scalar(0, 0, 0));
    //Values for calculating x simularity
    queue<vector<int>> setElementsTemp;
    queue<vector<int>> setElementsFinal;
    std::ofstream myfile;
    int subSet_Num = 0;
    
    int x1 = 0;
    int y1 = 0;
    int z1 = 0;
    //
for (int z=0; z<planes; z++) {
    cv::Mat testingTempImg = dataSet[z];
for (int y=0; y<rows; y++) {
    for (int x=0; x<cols; x++) {
        //cout << "X: " << x << "y: " << y << "\n";
        int c1 = dataSet[z].at<Vec3b>(Point(x,y))[0];
        int c2 = dataSet[z].at<Vec3b>(Point(x,y))[1];
        int c3 = dataSet[z].at<Vec3b>(Point(x,y))[2];

        if(c1!=255&&c2!=255&&c3!=255){
           // cout << "called \n";
            vector<int> temp1Point;
            temp1Point.push_back(x);
            temp1Point.push_back(y);
            temp1Point.push_back(z);
            setElementsTemp.push(temp1Point);
            
        }
        int color1 = rand() % 255;
        int color2 = rand() % 255;
    while(!setElementsTemp.empty()){
        //cout << setElementsTemp.size() << "\n";
        vector<int> evalPoint;
        evalPoint.push_back(setElementsTemp.front().at(0));
        evalPoint.push_back(setElementsTemp.front().at(1));
        evalPoint.push_back(setElementsTemp.front().at(2));
        
        setElementsFinal.push(evalPoint);
        setElementsTemp.pop();
        dataSet[z].at<Vec3b>(Point(x,y))[0]= 255;
        dataSet[z].at<Vec3b>(Point(x,y))[1]= color1;
        dataSet[z].at<Vec3b>(Point(x,y))[2]= color2;
        
        
        
        
        
        //****************** Z >= 0 Begines ********************************//
        z1 = evalPoint.at(2)-1;
        if(z1>=0){
            y1 = evalPoint.at(1)-1;
            if(y1>=0){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<=cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1>=0 ends
            
            y1 = y1+1;
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<=cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            //y1>=0 ends
            
            y1 = y1+1;
            if(y1<=rows){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<=cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1<rows ends
        }
        //******************* Z >= 0 ENDS ********************************//
        
        
        //****************** Z == 0 Begines ********************************//
        z1 = z1+1;
            y1 = evalPoint.at(1)-1;
            if(y1>=0){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1>=0 ends
            
            y1 = y1+1;
            x1 = evalPoint.at(0)-1;
            if(x1>=0){
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }
            }//x1>=0 ends
            //x == evalpoint ends
            x1 = x1+1;
            //Check not needed this is the center of th cube which is the original eval position
            x1 = x1+1;
            if(x1<cols){
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }
            }//x1<=cols ends
            
            //y1>=0 ends
            
            y1 = y1+1;
            if(y1<rows){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1<rows ends
        //******************* Z == 0 ENDS ********************************//
        
        
        //****************** Z <= planes Begines ********************************//
        z1 = z1+1;
        if(z1<planes){
            y1 = evalPoint.at(1)-1;
            if(y1>=0){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1>=0 ends
            
            y1 = y1+1;
            x1 = evalPoint.at(0)-1;
            if(x1>=0){
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }
            }//x1>=0 ends
            //x == evalpoint ends
            x1 = x1+1;
            if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                vector<int> pointTemp;
                pointTemp.push_back(x1);
                pointTemp.push_back(y1);
                pointTemp.push_back(z1);
                setElementsTemp.push(pointTemp);
                
                dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
            }//x == evalpoint ends
            x1 = x1+1;
            if(x1<cols){
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }
            }//x1<=cols ends
            
            //y1>=0 ends
            
            y1 = y1+1;
            if(y1<rows){
                x1 = evalPoint.at(0)-1;
                if(x1>=0){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1>=0 ends
                //x == evalpoint ends
                x1 = x1+1;
                if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                    vector<int> pointTemp;
                    pointTemp.push_back(x1);
                    pointTemp.push_back(y1);
                    pointTemp.push_back(z1);
                    setElementsTemp.push(pointTemp);
                    
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                    dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                }//x == evalpoint ends
                x1 = x1+1;
                if(x1<cols){
                    if(dataSet[z1].at<Vec3b>(Point(x1,y1))[0]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[1]!=255&&dataSet[z1].at<Vec3b>(Point(x1,y1))[2]!=255){
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }//x1<=cols ends
                
            }//y1<rows ends
        }
        //******************* Z <= planes ENDS ********************************//
        
   /* for (int z1 = (evalPoint.at(2)-1); z1 <= (evalPoint.at(2)+1); z1++) {
        for (int y1=(evalPoint.at(1)-1); y1<=(evalPoint.at(1)+1); y1++) {
            for (int x1=(evalPoint.at(0)-1); x1<=(evalPoint.at(0)+1); x1++) {
    
            //Checks to make sure we are withing the range of the data set
            //cout << pointTemp << "\n";
            //cout << x1 << " X " << y1 << " Y " <<"\n";
            //cout << z1 <<"\n";
            if(y1>=0&&x1>=0&&z1>=0&&y1<rows&&x1<cols&&z1<planes){
               // cout << "X: " << x1 << "y: " << y1 << "\n";
                //cout << evalPoint << "\n";
                
                int k1 = dataSet[z1].at<Vec3b>(Point(x1,y1))[0];
                int k2 = dataSet[z1].at<Vec3b>(Point(x1,y1))[1];
                int k3 = dataSet[z1].at<Vec3b>(Point(x1,y1))[2];
               // cout << k1 << " \n";
                    if(k1!=255&&k2!=255&&k3!=255){
                        
                        vector<int> pointTemp;
                        pointTemp.push_back(x1);
                        pointTemp.push_back(y1);
                        pointTemp.push_back(z1);
                        setElementsTemp.push(pointTemp);
                        
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[0]= 255;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[1]= color2;
                        dataSet[z1].at<Vec3b>(Point(x1,y1))[2]= color1;
                    }
                }
            }
        }
      }*/
    }
        cout << "write Started" << "\n";
        if(!setElementsFinal.empty()){
        String out_url = "/Users/macBook/Desktop/voumedata/subsets/subSet_" + std::to_string(subSet_Num);
        out_url = out_url + ".txt";

        myfile.open (out_url);
        }
        while(!setElementsFinal.empty()){
            //cout << "to wirte: " << setElementsFinal.size() << "\n";
            String point = "[" + std::to_string(setElementsFinal.front().at(0)) + ",";
            point = point + std::to_string(setElementsFinal.front().at(1)) + ",";
            point = point + std::to_string(setElementsFinal.front().at(2)) + "]";
            /*
            point = point + std::to_string(dataSet[setElementsFinal.front().at(2)].at<Vec3b>(Point(setElementsFinal.front().at(0),setElementsFinal.front().at(1)))[0]) + ",";
            point = point + std::to_string(dataSet[setElementsFinal.front().at(2)].at<Vec3b>(Point(setElementsFinal.front().at(0),setElementsFinal.front().at(1)))[1]) + ",";
            point = point + std::to_string(dataSet[setElementsFinal.front().at(2)].at<Vec3b>(Point(setElementsFinal.front().at(0),setElementsFinal.front().at(1)))[2]) + "]";*/
            myfile << point;
            setElementsFinal.pop();
        }
        if(myfile.is_open()){
        myfile.close();
        subSet_Num++;
        }
    }
}

    //cout << setElementsFinal.size() << "\n";

    /*String url = "/Users/macBook/Desktop/voumedata/testLineEvalSet/output_z" + std::to_string((z+10));
    url = url + ".tif";
    imwrite(url, testingTempImg);
    cout << "stop" << "\n";*/
    //imshow( "Contours", testingTempImg);
    }
}

void reApply(){
    for(int i =1; i<10; i++){
        String url = "/Users/macBook/Desktop/voumedata/tiffs/output" + std::to_string(i);
        url = url + ".tif";
        Mat orig = cv::imread(url, CV_LOAD_IMAGE_COLOR);
        url = "/Users/macBook/Desktop/voumedata/tiffs/output" + std::to_string(i);
        url = url + ".tif";
        Mat proccessed = cv::imread(url, CV_LOAD_IMAGE_COLOR);
        for (int y = 0; y<orig.rows; y++) {
            for (int x =0; x<orig.cols; i++) {
                if(proccessed.at<Vec3b>(Point(x,y))[0]!=255&&proccessed.at<Vec3b>(Point(x,y))[1]!=255&&proccessed.at<Vec3b>(Point(x,y))[2]!=255){
                    orig.at<Vec3b>(Point(x,y))[0] = 0;
                    orig.at<Vec3b>(Point(x,y))[1] = 0;
                    orig.at<Vec3b>(Point(x,y))[2] = 0;
                    
                }
            }
        }
        url = "/Users/macBook/Desktop/voumedata/reoutline/output" + std::to_string(i);
        url = url + ".tif";
        imwrite(url, orig);
    }
}
