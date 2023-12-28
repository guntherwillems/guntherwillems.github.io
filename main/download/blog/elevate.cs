/// <summary>
/// mapstart.cs
/// 
/// Written by  : Gunther Willems
/// Version     : 1.00
/// Date : 1.00 : 25/10/2012
/// 
/// Program type: Windows applicaton
/// Compilation : csc.exe /target:winexe /optimize+ elevate.cs
/// Parameters  : [program] [argument 1] [argument 2] ...
///
/// Description : Start a program using the Admin token of the current user
///               (if the user is in the administrators group) (for Windows >= Vista)
/// 
/// 
/// </summary>

using System;
using System.Diagnostics;                // Process
using System.Windows.Forms;              // MessageBox

namespace elevate
{
  class elevate
  {
    private static string program = "";
    private static string arguments = "";

    // --------------------------------- Main -------------------------------------- 

    #region Main method
    static void Main( string[] args )
    {
      GetProgramArguments();
      StartProgram();
    } // main
    #endregion

    // -----------------------------------------------------------------------------

    private static  void GetProgramArguments()
    {
      int nrArgs = Environment.GetCommandLineArgs().Length; // programname is the first argument

      if (nrArgs < 2 )
      {
        MessageBox.Show("Syntax:" + Environment.NewLine +
                         "  elevate.exe [program] [argument 1] [argument 2] ..." + Environment.NewLine +
                         "  ex. elevate k:\\install\\test\\test.exe /wait"
                         , "Error");
        Environment.Exit(-1);
      }

      program = Environment.GetCommandLineArgs()[1];

      for (int i = 2; i <= nrArgs - 1; ++i)
        if (i == 2)
         arguments += Environment.GetCommandLineArgs()[i];
        else
         arguments += " " + Environment.GetCommandLineArgs()[i];
    }

    // -----------------------------------------------------------------------------

    private static void StartProgram()
    {
      ProcessStartInfo psi = new ProcessStartInfo();
      Process p;

      //Create process
      psi.FileName = program;
      psi.Arguments = arguments;
      psi.UseShellExecute = true;
      psi.Verb = "runas";  // use the Admin token for Windows >= Vista (UAC must be partially disabled for no user interaction needed)

      try
       {
        p = Process.Start(psi);
        p.WaitForExit();
       }
      catch (Exception err)
       {
        MessageBox.Show(err.Message + Environment.NewLine + program + " " + arguments,"Elevate.exe");
       }
    }

  }  // class


}  // namespace
// ---------------------------- End of program ---------------------------------