/// <summary>
/// base64.cs
/// 
/// Written by  : Gunther Willems
/// Version     : 1.00
/// Date : 1.00 : 12/04/2013
/// 
/// Program type: console application
/// Compilation : csc /target:exe /optimize+ base64.cs
/// Parameters  : base64 [-e / -d / -encode / -decode] <input file> <output file>
///
/// Description : encode or decode a file from and to base64
///               example: base64 -encode test.bin test.b64
///                        base64 -decode test.b64 test.bin
///
/// </summary>
 
using System;
using System.IO;

//namespace Base64
//{
 public class Base64
  {

// --------------------------------- Main --------------------------------------
    
    #region Main method
    public static int Main()
      {
       string infile="";               // input file
       string outfile="";             // output file
       string operation="";          // encode or decode parameter
       string base64string="";      // destination string
       byte[] binarystring = null; // destination byte array

       // Check parameters
       if (Environment.GetCommandLineArgs().Length == 4)
        {
          operation = Environment.GetCommandLineArgs()[1];
          infile = Environment.GetCommandLineArgs()[2];
          outfile = Environment.GetCommandLineArgs()[3];
        }
       else
        {
          Console.WriteLine("Syntax: base64 [-e / -d / -encode / -decode] <input file> <output file>");
          return 1;
        } 
        
       
       try
         {

          if ( operation == "-e" || operation == "-encode" )
           {
            binarystring = System.IO.File.ReadAllBytes(infile);
            base64string = Convert.ToBase64String( binarystring );
            System.IO.File.WriteAllText( outfile, base64string );
           }
          else if ( operation == "-d" || operation == "-decode" )
          {
           base64string = System.IO.File.ReadAllText(infile);
           binarystring = System.Convert.FromBase64String( base64string );
           System.IO.File.WriteAllBytes( outfile, binarystring );
          }
          else
          {
           Console.WriteLine("Wrong parameter " + operation);
           Console.WriteLine("Syntax: base64 [-e / -d / -encode / -decode] <input file> <output file>");
           return 1;
          }
          

         } 
       catch ( FileNotFoundException )
         {
          Console.WriteLine("File not found: {0}", infile);
          return 1;
         }
       catch ( Exception e )
         {
          Console.WriteLine("Error while processing file: {0}", infile);
          Console.WriteLine();
          Console.WriteLine("Exception: {0}", e);
          return 1;
         }

       return 0;
      }  // Main
    #endregion

// -----------------------------------------------------------------------------

  }  // class

//}  // namespace

// ---------------------------- End of program ---------------------------------